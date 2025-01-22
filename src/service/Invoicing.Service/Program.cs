using Grc.Utility.Settings;
using Grc.Utility.Usage;
using Invoicing.Service.Authorization;
using Invoicing.Service.Startup;
using JasperFx.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.FeatureManagement;
using Oakton;
using Serilog;
using Wolverine.Http;
using Wolverine.Http.FluentValidation;

//Created using Service Invoicing V1.0

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Host.ApplyOaktonExtensions();

    builder.Logging.ClearProviders();
    builder.Host.UseSerilog();

    AddOptions<ApplicationInfo>(ApplicationInfo.SectionName);
    AddOptions<Auth0Settings>(Auth0Settings.SectionName);
    AddOptions<ConnectionStrings>(ConnectionStrings.SectionName);
    AddOptions<LoggingSettings>(LoggingSettings.SectionName);
    AddOptions<MicroServiceUrls>(MicroServiceUrls.SectionName);
    AddOptions<TenantSettings>(TenantSettings.SectionName);

    builder.Services.AddHostedService<UsagePushService>();
    builder.Services.AddFeatureManagement(builder.Configuration.GetSection("FeatureFlags"));
    builder.Services.RegisterMarten(!builder.Environment.IsDevelopment());
    builder.Services.RegisterOpenTelemetry();
    builder.Services.RegisterLogging();
    builder.Services.RegisterServices();
    builder.Services.RegisterSecurity();
    builder.Services.RegisterSwagger();
    builder.Services.RegisterSettingsService();
    builder.Services.RegisterLocalization();
    builder.Services.ConfigureSystemTextJsonForWolverineOrMinimalApi(o =>
    {
        o.SerializerOptions.Converters.AddRange(Grc.Utility.UnitsNetSerialization.DefaultUnitsConverters.Converters);
    });

    var config = new AutoMapper.MapperConfiguration(cfg =>
    {
        cfg.AddMaps(AppDomain.CurrentDomain.GetAssemblies());
    });
    builder.Services.AddSingleton(config.CreateMapper());
    builder.Services.AddSingleton<IAuthorizationHandler, AuthorizationHandler>();
    builder.Services.RegisterMessaging(builder.Host, builder.Environment.IsDevelopment());

    var app = builder.Build();
    Log.Information("Application Initializing");

    app.UseSwaggerInDevelopment();
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseMiddleware<MetricsTenantMiddleware>();
    app.UseOpenTelemetryPrometheusScrapingEndpoint(); // exposes the /metrics api
    app.UseMiddleware<LogTenantMiddleware>();
    app.UseRequestLocalization();
    app.MapWolverineEndpoints(opts =>
    {
        opts.RequireAuthorizeOnAll();
        opts.UseFluentValidationProblemDetailMiddleware();
        opts.TenantId.IsClaimTypeNamed("TenantId");
        opts.TenantId.IsRequestHeaderValue("TenantId");
    });
    //await app.FetchSettings();

    var appLifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
    var counterService = app.Services.GetRequiredService<UsagePushService>();
    appLifetime.ApplicationStopping.Register(() =>
    {
        counterService.FlushUsage();
    });

    Log.Information("Application Starting");
    await app.RunOaktonCommands(args);
    Log.Information("Application Shutting Down");

    void AddOptions<T>(string section) where T : class
    {
        builder.Services.AddOptions<T>()
            .BindConfiguration(builder.Configuration.GetRequiredSection(section).Path)
            .ValidateDataAnnotations()
            .ValidateOnStart();
    }
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
