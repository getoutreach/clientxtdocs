using System;

namespace Outreach.CXT.Demo.Server
{
    public static class Constants
    {
        public const string DEFAULT_HTTP_CLIENT = "DEFAULT";

        public const string AUTH_USER_COOKIE_NAME = "cxt-sdk-user-v2";

        public static string GetTokenCacheKey(string userId) => "cxt-token-cache-" + userId;
    }

    public static class AzureServiceKeys {
        
        public const string OUTREACH_HOST = "OUTREACH_HOST";
        public const string OUTREACH_API_HOST = "OUTREACH_API_HOST";
        public const string APPLICATION_ID = "APPLICATION_ID";
        public const string APPLICATION_SECRET = "APPLICATION_SECRET";
        public const string REDIRECT_URI = "REDIRECT_URI";
        public const string CONNECT_URI = "CONNECT_URI";
        public const string ADDON_HOST_ORIGIN = "ADDON_HOST_ORIGIN";


    }
}
