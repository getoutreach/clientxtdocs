using System;

namespace Outreach.CXT.Demo.Server
{
    public static class Constants
    {
        public const string AUTH_USER_COOKIE_NAME = "ctx-sdk-user";

        public static string GetTokenCacheKey(string userId) => "ctx-token-cache-" + userId;
    }
}
