using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ILogger<TokenController> logger;
        private readonly IMemoryCache cache;

        public TokenController(ILogger<TokenController> logger, IMemoryCache memoryCache)
        {
            this.logger = logger;
            this.cache = memoryCache;
        }

        [HttpPost]
        public ActionResult<Token> Post([FromBody] TokenRequest tokenRequest)
        {
            this.logger.LogDebug("[TokenController]:Post called with userId:" + tokenRequest.UserId);

            if (!this.cache.TryGetValue<Token>(Constants.GetTokenCacheKey(tokenRequest.UserId), out var token))
            {
                this.logger.LogInformation("[TokenController]:Cached token for userId:" + tokenRequest.UserId + " - NOT FOUND");
                return NotFound();
            }

            if (token.ExpiresAt < DateTime.UtcNow)
            {
                this.logger.LogInformation("[TokenController]: Cached token for userId:" + tokenRequest.UserId + " - EXPIRED");
                return NotFound();
            }

            this.logger.LogInformation("[TokenController]: Cached token for userId:" + tokenRequest.UserId + " - FOUND");
            return Ok(token);
        }
    }

    public class TokenRequest
    {
        public string UserId { get; set; }
    }

    public class Token
    {
        public string Value { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}
