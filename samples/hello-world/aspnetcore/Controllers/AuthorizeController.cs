using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Outreach.CXT.Demo.Server.Extensions;
using Outreach.CXT.Demo.Server.Models;

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
        public async Task<ActionResult> Index([FromQuery]string code)
        {
            var pattern = new Regex(@"%\d\w", RegexOptions.Compiled);

            var userId = this.Request.Cookies[Constants.AUTH_USER_COOKIE_NAME];

            var outreachHost = this.configuration.GetValue<string>(AzureServiceKeys.OUTREACH_HOST_KEY);
            var clientId = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_ID);
            var clientSecret = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_SECRET);
            var redirectUri = this.configuration.GetValue<string>(AzureServiceKeys.REDIRECT_URI);

            this.logger.LogInformation($"[AuthorizeController]::Login - userId: {userId}, code: {code}, clientId: {clientId}, clientSecret:{clientSecret}, redirectUri:{redirectUri}");

            string connectPage = this.configuration.GetValue<string>(AzureServiceKeys.CONNECT_URI);
            using var client = this.httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
            var payload = new Dictionary<string, string>()
            {
                { "client_id", clientId},
                { "client_secret", clientSecret },
                { "redirect_uri", redirectUri },
                { "code", code },
                { "grant_type", "authorization_code"}
            };

            var request = await client.PostAsync($"{outreachHost}/oauth/token", new FormUrlEncodedContent(payload));
            var content = await request.Content.ReadAsStringAsync();
            if (!request.IsSuccessStatusCode)
            {
                this.logger.LogError($"[AuthorizeController]::Login-ERROR {request.StatusCode} - {content}");
                request.EnsureSuccessStatusCode();
            }

            var tokenInfo = JsonConvert.DeserializeObject<TokenInfo>(content);
            this.memoryCache.Set(Constants.GetTokenCacheKey(userId), JsonConvert.SerializeObject(tokenInfo), DateTimeOffset.MaxValue);

            // now we redirect to connect page
            var expiresAt = tokenInfo.CreatedAt.FromEpochMillis().AddSeconds(tokenInfo.ExpiresIn);
            var connectUri = $"{connectPage}?token={tokenInfo.AccessToken}&expiresAt={expiresAt.ToEpochMillis()}";
            this.logger.LogInformation($"[AuthorizeController]::Login - redirect to: {connectUri}");
            return this.Redirect(connectUri);
        }
    }
}