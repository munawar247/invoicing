using Grc.Utility.Settings;
using Invoicing.Service.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.FeatureManagement;
using Microsoft.IdentityModel.Tokens;

namespace Invoicing.Service.Startup
{
    public static class RegisterSecuritySetup
    {
        public static void RegisterSecurity(this IServiceCollection services)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var auth0Settings = serviceScope.ServiceProvider.GetRequiredService<IOptions<Auth0Settings>>().Value;

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = auth0Settings.Domain;
                    options.Audience = auth0Settings.Audience;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true
                    };
                });

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(auth0Settings.ClientUrl)
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("InvoicingPolicy", policy =>
                {
                    policy.Requirements.Add(new AuthorizationService("module:invoicing"));
                    policy.RequireAuthenticatedUser();
                });
            });

            // Build the service provider and check feature flags for authentication settings
            using (ServiceProvider serviceProvider = services.BuildServiceProvider())
            {
                IFeatureManager featureManager = serviceProvider.GetRequiredService<IFeatureManager>();
                bool authenticationEnabled = featureManager.IsEnabledAsync("Authentication").Result;

                if (!authenticationEnabled)
                    services.AddSingleton<IAuthorizationHandler, AnonymousAuthorizationHandler>();
            }
        }

    }
}