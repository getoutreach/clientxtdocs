using System;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.StaticFiles.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Outreach.CXT.Demo.Server.Services;
using Polly;
using Polly.Retry;

namespace Outreach.CXT.Demo.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMemoryCache();
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            
            // define default http client retry policy as 10 sec timeout with 3 retries
            services.AddHttpClient(Constants.DEFAULT_HTTP_CLIENT, client =>
                {
                    client.DefaultRequestVersion = new Version(2, 0);
                    client.Timeout = new TimeSpan(0, 0, 30);
                })
                .AddTransientHttpErrorPolicy(DefaultRetryPolicy);

            services.AddTransient<IOutreachService, OutreachService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
 endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                spa.Options.DefaultPage = "/index.html";
/*
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
*/
            });
        }

           
        /// <summary>
        /// Defaults the retry policy (network failures, HTTP 5xx, HTTP 408)
        /// </summary>
        /// <param name="policy">The policy.</param>
        /// <returns></returns>
        private static AsyncRetryPolicy<HttpResponseMessage> DefaultRetryPolicy(PolicyBuilder<HttpResponseMessage> policy)
        {
            return policy.WaitAndRetryAsync(new[]
            {
                TimeSpan.FromSeconds(1),
                TimeSpan.FromSeconds(3),
                TimeSpan.FromSeconds(5)
            });
        }
    }
}
