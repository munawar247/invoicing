namespace Invoicing.Service.Startup
{
    public static class ServiceSetup
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<SecurityJwtEvents>();
            //services.AddControllers();
            services.AddEndpointsApiExplorer();
            //services.AddScoped<IInvoiceService, InvoiceService>();
            return services;
        }
    }
}