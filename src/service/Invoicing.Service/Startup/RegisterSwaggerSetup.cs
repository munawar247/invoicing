using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Invoicing.Service.Startup
{
    public static class RegisterSwaggerSetup
    {
        public static IServiceCollection RegisterSwagger(this IServiceCollection services)
        {
            var securityScheme = new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JSON Web Token based security",
            };

            var securityReq = new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },

                    Array.Empty<string>()
                }
            };

            //This allows you to authorize against swagger using a JWT
            //You can generate a JWT using http://jwtbuilder.jamiekurtz.com/
            //You will need to use the settings in the appSettings.json to generate this token
            //once generated you can click the "Authorize" button in swagger
            //then type in the word Bearer followed by your token:
            //e.g. Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJZb3VyQVBJTmFtZSIsImlhdCI6MTY5N...
            //NOTE: Not typing in Bearer will cause this to fail!


            services.AddSwaggerGen(o =>
            {
                o.AddSecurityDefinition("Bearer", securityScheme);
                o.AddSecurityRequirement(securityReq);
                o.OperationFilter<TenantIdFilter>();
                o.OperationFilter<LanguageFilter>();
            }
            );

            return services;
        }

        public static WebApplication UseSwaggerInDevelopment(this WebApplication app)
        {
            if (!app.Environment.IsDevelopment())
            {
                return app;
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            return app;
        }
    }

    /// <summary>
    /// Operation filter to add the requirement of the custom header
    /// </summary>
    public class TenantIdFilter : IOperationFilter
    {
        void IOperationFilter.Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            operation.Parameters ??= new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "TenantId",
                In = ParameterLocation.Header,
                Required = false
            });
        }
    }

    // <summary>
    /// Operation filter to add the requirement of the custom header
    // </summary>
    public class LanguageFilter : IOperationFilter
    {
        void IOperationFilter.Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
                operation.Parameters = new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "Accept-Language",
                In = ParameterLocation.Header,
                Required = false
            });
        }
    }
}