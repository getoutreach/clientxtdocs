using System;

namespace Outreach.CXT.Demo.Server.Controllers
{
    public class ConnectViewModel
    {
        /// <summary>
        /// Gets or sets the token.
        /// </summary>
        /// <value>
        /// The token.
        /// </value>
        public string Token { get; set; }

        public long ExpiresAt { get; set; }

        public string AddonHostOrigin { get; set; }
    }
}