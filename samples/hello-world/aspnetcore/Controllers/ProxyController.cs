using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Outreach.CXT.Demo.Server.Models;
using Outreach.CXT.Demo.Server.Services;

namespace Outreach.CXT.Demo.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProxyController : ControllerBase
    {
        private readonly IOutreachService outreachService;

        public ProxyController(IOutreachService outreachService)
        {
            this.outreachService = outreachService;
        }

        [HttpGet("info")]
        public async Task<OutreachInfo> Info()
        {
            var token = this.Request.Headers["x-outreach-token"].ToString();
            return await this.outreachService.GetInfoAsync(token);
        }
    }
}
