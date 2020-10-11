using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizeController : ControllerBase
    {
        private ILogger<AuthorizeController> logger;
        private IHttpClientFactory httpClientFactory;

        public AuthorizeController(ILogger<AuthorizeController> logger, IHttpClientFactory httpClientFactory)
        {
            this.logger = logger;
            this.httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public IActionResult Login([FromQuery]string code)
        {
            

            var userId = this.Request.Cookies[Constants.AUTH_USER_COOKIE_NAME];

            using (var client = this.httpClientFactory.CreateClient())
            {
                
            }


            return Ok();
        }
    }
}
