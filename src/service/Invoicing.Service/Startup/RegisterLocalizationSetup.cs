using System.Globalization;
using Microsoft.AspNetCore.Localization;

namespace Invoicing.Service.Startup;
public static class RegisterLocalizationSetup
{
    public static IServiceCollection RegisterLocalization(this IServiceCollection services)
    {
        services.Configure<RequestLocalizationOptions>(options =>
        {
            var supportedCultures = new[]
            {
                    new CultureInfo("en-US"),
                    new CultureInfo("es-MX"),
                // Add other cultures here
            };

            options.DefaultRequestCulture = new RequestCulture("en-US");
            options.SupportedCultures = supportedCultures;
            options.SupportedUICultures = supportedCultures;
        });
        return services;
    }
}
