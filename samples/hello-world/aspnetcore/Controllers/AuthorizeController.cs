using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizeController : ControllerBase
    {
        private ILogger<AuthorizeController> logger;
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IMemoryCache memoryCache;

        public AuthorizeController(ILogger<AuthorizeController> logger, IConfiguration configuration, IHttpClientFactory httpClientFactory, IMemoryCache memoryCache)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.httpClientFactory = httpClientFactory;
            this.memoryCache = memoryCache;
        }

        [HttpGet]
        public async Task<ActionResult> Login([FromQuery]string code)
        {
            var userId = this.Request.Cookies[Constants.AUTH_USER_COOKIE_NAME];

            using (var client = this.httpClientFactory.CreateClient())
            {

                var payload = new Dictionary<string, string>()
                {
                    { "client_id", this.configuration.GetValue<string>("APPLICATION_ID") },
                    { "client_secret", this.configuration.GetValue<string>("APPLICATION_SECRET") },
                    { "redirect_uri", this.configuration.GetValue<string>("REDIRECT_URI") },
                    { "code", code },
                    { "grant_type", "authorization_code"}
                };

                var request = await client.PostAsync("https://api.outreach.io/oauth/token", new FormUrlEncodedContent(payload));
                request.EnsureSuccessStatusCode();

                var content = await request.Content.ReadAsStringAsync();
                var tokenInfo = JsonConvert.DeserializeObject<TokenInfo>(content);


                this.memoryCache.Set(Constants.GetTokenCacheKey(userId), JsonConvert.SerializeObject(tokenInfo), DateTimeOffset.MaxValue);

                // now we redirect to connect page
                return this.Ok();

            }

           return Ok();
        }
    }
}