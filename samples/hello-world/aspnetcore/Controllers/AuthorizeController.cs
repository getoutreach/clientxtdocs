using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Outreach.CXT.Demo.Server.Extensions;
using Outreach.CXT.Demo.Server.Services;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizeController : ControllerBase
    {
        private ILogger<AuthorizeController> logger;
        private readonly IConfiguration configuration;
        private readonly IOutreachService outreachService;
        private readonly IMemoryCache memoryCache;

        public AuthorizeController(ILogger<AuthorizeController> logger, IConfiguration configuration, IOutreachService outreachService, IMemoryCache memoryCache)
        {
            this.logger = logger;
            this.configuration = configuration;
            this.outreachService = outreachService;
            this.memoryCache = memoryCache;
        }

        [HttpGet]
        public async Task<ActionResult> Login([FromQuery]string code)
        {
            var userId = this.Request.Cookies[Constants.AUTH_USER_COOKIE_NAME];
            string connectPage = this.configuration.GetValue<string>(AzureServiceKeys.CONNECT_URI);

            var tokenInfo =  await this.outreachService.GetTokenAsync(code);
            var key = Constants.GetTokenCacheKey(userId);
            var value = JsonConvert.SerializeObject(tokenInfo);

            this.memoryCache.Set(key, value, DateTimeOffset.MaxValue);

            // now we redirect to connect page
            var expiresAt = (tokenInfo.CreatedAt*1000).FromEpochMillis().AddSeconds(tokenInfo.ExpiresIn);
            var connectUri = $"{connectPage}?token={tokenInfo.AccessToken}&expiresAt={expiresAt.ToEpochMillis()}";
            return this.Redirect(connectUri);
        }
    }
}