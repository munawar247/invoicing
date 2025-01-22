using Grc.Utility.Settings;
using Grc.Utility.UnitsNetSerialization;
using Invoicing.Data.Domain;
using Invoicing.Data.Projections;
using JasperFx.CodeGeneration;
using JasperFx.Core;
using Marten;
using Marten.Events;
using Marten.Events.Daemon.Resiliency;
using Marten.Events.Projections;
using Marten.Storage;
using Microsoft.Extensions.Options;
using Wolverine.Marten;

namespace Invoicing.Service.Startup
{
    public static class RegisterMartenSetup
    {
        public static void RegisterMarten(this IServiceCollection services, bool usePreGeneratedCode)
        {
            using var serviceScope = services.BuildServiceProvider().CreateScope();
            var connectionString = serviceScope.ServiceProvider.GetRequiredService<IOptions<ConnectionStrings>>().Value;

            services.AddMarten(opts =>
            {
                opts.Connection(connectionString.Database);
                opts.Events.TenancyStyle = TenancyStyle.Conjoined;
                opts.Policies.AllDocumentsAreMultiTenanted();
                opts.DisableNpgsqlLogging = true;

                if (usePreGeneratedCode) //for anyone outside of development, the build server will generate the code so we should load it
                    opts.GeneratedCodeMode = TypeLoadMode.Static;

                // This line ensures that Marten knows it should generate code for when stream aggregation is used
                opts.Projections.LiveStreamAggregation<Invoice>();
               

                //if using a string as an identifier
                opts.Events.StreamIdentity = StreamIdentity.AsString;
                
                opts.Schema.For<Invoice>().Identity(x => x.Id);
                opts.Schema.For<Invoice.InvoiceLine>().Identity(x => x.Id);

                opts.UseSystemTextJsonForSerialization(configure: settings =>
                {
                    settings.Converters.AddRange(DefaultUnitsConverters.Converters);
                });
                //Add projections here
               
                opts.Projections.Add<InvoiceDetailsProjection>(ProjectionLifecycle.Async);
            })
                .UseLightweightSessions()
                .IntegrateWithWolverine()
                .AddAsyncDaemon(DaemonMode.HotCold);
        }
    }
}