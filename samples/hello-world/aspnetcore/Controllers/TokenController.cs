using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Outreach.CXT.Demo.Server.Extensions;
using Outreach.CXT.Demo.Server.Models;
using Outreach.CXT.Demo.Server.Services;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ILogger<TokenController> logger;
        private readonly IMemoryCache memoryCache;
        private readonly IOutreachService outreachService;

        public TokenController(ILogger<TokenController> logger, IMemoryCache memoryCache, IOutreachService outreachService)
        { 
            this.logger = logger;
            this.memoryCache = memoryCache;
            this.outreachService = outreachService;
        }

        [HttpPost]
        public async Task<ActionResult<Token>> Post([FromBody] TokenRequest tokenRequest)
        {

            var cacheKey = Constants.GetTokenCacheKey(tokenRequest.UserId, tokenRequest.ClientId);

            if (!this.memoryCache.TryGetValue<string>(cacheKey, out var serializedToken))
            {
                return NotFound();
            }

            var tokenInfo = JsonConvert.DeserializeObject<TokenInfo>(serializedToken);

            var expiresAt = (tokenInfo.CreatedAt * 1000).FromEpochMillis().AddSeconds(tokenInfo.ExpiresIn);

            var expiredToken = expiresAt < DateTime.UtcNow;
            if (expiredToken)
            {
                tokenInfo = await this.outreachService.RefreshTokenAsync(tokenInfo.RefreshToken);
                var value = JsonConvert.SerializeObject(tokenInfo);
                this.memoryCache.Set(cacheKey, value, DateTimeOffset.MaxValue);
                expiresAt = (tokenInfo.CreatedAt * 1000).FromEpochMillis().AddSeconds(tokenInfo.ExpiresIn);
            }

            return new Token
            {
                Value = tokenInfo.AccessToken,
                ExpiresAt = expiresAt.ToEpochMillis()
            };
        }
    }
}
