using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Outreach.CXT.Demo.Server.Extensions;

namespace Outreach.CXT.Demo.Server.Controllers
{
    public class ConnectController : Controller
    {
        private readonly IConfiguration configuration;

        public ConnectController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IActionResult Index(string token, DateTime expiresAt)
        {

            var viewModel = new ConnectViewModel
            {
                Token = token,
                ExpiresAt = expiresAt.ToEpochMillis(),
                AddonHostOrigin = this.configuration.GetValue<string>(AzureServiceKeys.ADDON_HOST_ORIGIN)
            };

            return this.View(viewModel);
        }
    }
}
