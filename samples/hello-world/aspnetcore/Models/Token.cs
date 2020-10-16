using System;

namespace Outreach.CXT.Demo.Server.Models
{
    public class Token
    {
        public string Value { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}