using Grc.Utility.Settings;
using Microsoft.Extensions.Options;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;

namespace Invoicing.Service.Startup
{
    public static class RegisterOpenTelemetrySetup
    {
        public static void RegisterOpenTelemetry(this IServiceCollection services)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var applicationName = serviceScope.ServiceProvider.GetRequiredService<IOptions<ApplicationInfo>>().Value.Name;

            services.AddOpenTelemetry()
                .ConfigureResource(resource => resource.AddService(applicationName))
                .WithMetrics(metrics => metrics
                    .AddAspNetCoreInstrumentation()
                    .AddMeter(applicationName)
                    .AddMeter("Microsoft.AspNetCore.Hosting")
                    .AddMeter("Microsoft.AspNetCore.Server.Kestrel")
                    .AddMeter("Wolverine:" + applicationName) //this has to match the opts.ServiceName in the wolverine config
                    .AddPrometheusExporter());
        }
    }
}