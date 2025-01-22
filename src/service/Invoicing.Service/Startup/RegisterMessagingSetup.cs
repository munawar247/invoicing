using Grc.Utility.Settings;
using Grc.Utility.UnitsNetSerialization;
using Invoicing.Messaging.Validators;
using JasperFx.CodeGeneration;
using JasperFx.Core;
using JasperFx.Core.Reflection;
using Microsoft.Extensions.Options;
using System.Reflection;
using Wolverine;
using Wolverine.AzureServiceBus;
using Wolverine.FluentValidation;

namespace Invoicing.Service.Startup
{
    public static class RegisterMessagingSetup
    {
        public static void RegisterMessaging(this IServiceCollection services, ConfigureHostBuilder host, bool isDevelopment)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var applicationInfo = serviceScope.ServiceProvider.GetRequiredService<IOptions<ApplicationInfo>>().Value;
            var connectionString = serviceScope.ServiceProvider.GetRequiredService<IOptions<ConnectionStrings>>().Value;
            const int autoDeleteQueueDuration = 15;
            bool.TryParse(Environment.GetEnvironmentVariable("AUTO_DELETE_QUEUE_ENABLED"), out var isAutoDeleteQueueEnabled);

            host.UseWolverine(opts =>
            {
                if (!isDevelopment) //for anyone outside of development, the build server will generate the code so we should load it
                    opts.CodeGeneration.TypeLoadMode = TypeLoadMode.Static;
                opts.ServiceName = applicationInfo.Name;
                opts.UseAzureServiceBus(connectionString.ServiceBus)
                    .AutoProvision()
                    .ConfigureSenders(x => {
                        x.UseDurableOutbox();
                        if (isDevelopment || isAutoDeleteQueueEnabled)
                            x.ConfigureQueue(options => options.AutoDeleteOnIdle = autoDeleteQueueDuration.Minutes());
                    })
                    .ConfigureListeners(x => {
                        if (isDevelopment || isAutoDeleteQueueEnabled)
                            x.ConfigureQueue(options => options.AutoDeleteOnIdle = autoDeleteQueueDuration.Minutes());
                    })
                    .SystemQueuesAreEnabled(false); //disable request/response queue creation
                //opts.Discovery.IncludeAssembly(typeof(Data.Domain.ShipmentCharge).Assembly); // This will include entire assembly, no need to add all validator classes
                opts.UseFluentValidation();
                opts.Discovery.IncludeAssembly(typeof(CreateInvoiceValidator).Assembly);
                var currentAssemblyStartupNameGeneratedByWolverine = $"{Assembly.GetExecutingAssembly().GetName().Name}.Startup";
                opts.Policies.AddMiddleware(typeof(CorrelationLoggingMiddleware),
                            chain => chain.MessageType.IsInNamespace(currentAssemblyStartupNameGeneratedByWolverine));//added to resolve propertyWrapper issue
                //opts.Policies.OnException<ConcurrencyException>().RetryTimes(3);
                //opts.Policies.OnException<NpgsqlException>().RetryWithCooldown(50.Milliseconds(), 100.Milliseconds(), 250.Milliseconds());
                opts.Policies.AutoApplyTransactions();
                opts.UseSystemTextJsonForSerialization(config =>
                {
                    config.Converters.AddRange(DefaultUnitsConverters.Converters);
                });

                //listeners
                var tenantActivatedSubscriptionName = $"{applicationInfo.Name}-TenantActivated";
                opts.ListenToAzureServiceBusSubscription(tenantActivatedSubscriptionName).FromTopic("TenantActivated");

                //For long-running messages, look at running the transactional inbox pattern to avoid
                //messaging timeouts and retries. Just remove the ProcessInline() from the queue to enable the transactional inbox
            });
        }
    }
}
