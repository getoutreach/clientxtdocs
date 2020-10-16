using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Outreach.CXT.Demo.Server.Models;

namespace Outreach.CXT.Demo.Server.Services
{
    public class OutreachService : IOutreachService
    {
        private readonly IConfiguration configuration;
        private readonly ILogger<OutreachService> logger;
        private readonly IHttpClientFactory httpClientFactory;

        public OutreachService(IConfiguration configuration, ILogger<OutreachService> logger, IHttpClientFactory httpClientFactory)
        {
            this.configuration = configuration;
            this.logger = logger;
            this.httpClientFactory = httpClientFactory;
        }

        public async Task<TokenInfo> GetTokenAsync(string code)
        {
            var outreachHost = this.configuration.GetValue<string>(AzureServiceKeys.OUTREACH_HOST_KEY);
            var clientId = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_ID);
            var clientSecret = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_SECRET);
            var redirectUri = this.configuration.GetValue<string>(AzureServiceKeys.REDIRECT_URI);

            using var client = this.httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
            var payload = new Dictionary<string, string>()
            {
                { "client_id", clientId},
                { "client_secret", clientSecret },
                { "redirect_uri", redirectUri },
                { "code", code },
                { "grant_type", "authorization_code"}
            };

            var request = await client.PostAsync($"{outreachHost}/oauth/token", new FormUrlEncodedContent(payload));
            var content = await request.Content.ReadAsStringAsync();
            if (!request.IsSuccessStatusCode)
            {
                this.logger.LogError($"[CXT][AuthorizeController]::Login-ERROR {request.StatusCode} - {content}");
                request.EnsureSuccessStatusCode();
            }

            return JsonConvert.DeserializeObject<TokenInfo>(content);
        }

        public async Task<TokenInfo> RefreshTokenAsync(string refreshToken)
        {
            var outreachHost = this.configuration.GetValue<string>(AzureServiceKeys.OUTREACH_HOST_KEY);
            var clientId = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_ID);
            var clientSecret = this.configuration.GetValue<string>(AzureServiceKeys.APPLICATION_SECRET);
            var redirectUri = this.configuration.GetValue<string>(AzureServiceKeys.REDIRECT_URI);

            using var client = this.httpClientFactory.CreateClient(Constants.DEFAULT_HTTP_CLIENT);
            var payload = new Dictionary<string, string>()
            {
                { "client_id", clientId},
                { "client_secret", clientSecret },
                { "redirect_uri", redirectUri },
                { "refresh_token", refreshToken },
                { "grant_type", "refresh_token"}
            };

            var request = await client.PostAsync($"{outreachHost}/oauth/token", new FormUrlEncodedContent(payload));
            var content = await request.Content.ReadAsStringAsync();
            if (!request.IsSuccessStatusCode)
            {
                this.logger.LogError($"[CXT][AuthorizeController]::Login-ERROR {request.StatusCode} - {content}");
                request.EnsureSuccessStatusCode();
            }

            return JsonConvert.DeserializeObject<TokenInfo>(content);
        }
    }
}
