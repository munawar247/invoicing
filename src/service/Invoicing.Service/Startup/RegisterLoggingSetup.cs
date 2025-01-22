using Grc.Utility.Settings;
using Microsoft.Extensions.Options;
using Serilog;
using Serilog.Core;
using Serilog.Events;

namespace Invoicing.Service.Startup
{
    public static class RegisterLoggingSetup
    {
        public static IServiceCollection RegisterLogging(this IServiceCollection services)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var appInfo = serviceScope.ServiceProvider.GetRequiredService<IOptions<ApplicationInfo>>().Value;
            var loggingSettings = serviceScope.ServiceProvider.GetRequiredService<IOptions<LoggingSettings>>().Value;

            Log.Logger = CreateLogger(appInfo, loggingSettings);
            return services;
        }

        public static Logger CreateLogger(ApplicationInfo appInfo, LoggingSettings loggingSettings)
        {
            return new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
                .MinimumLevel.Override("Marten", LogEventLevel.Warning)
                .MinimumLevel.Override("Wolverine", LogEventLevel.Warning)
                .MinimumLevel.Override("Wolverine.Transports.ListeningAgent", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .Enrich.WithEnvironmentUserName()
                .Enrich.WithProperty("ApplicationEnvironment", System.Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT") ?? "UNKNOWN")
                .Enrich.WithProperty("Application", appInfo.Name)
                .Enrich.WithProperty("Version", appInfo.Version)
                .WriteTo.Console()
                .WriteTo.Seq(loggingSettings.Seq.Url)
                .CreateLogger();
        }
    }

}
