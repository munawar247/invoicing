using Serilog.Context;

namespace Invoicing.Service.Startup
{
    public class LogTenantMiddleware
    {
        private readonly RequestDelegate _next;

        public LogTenantMiddleware(RequestDelegate next)
        {
            this._next = next;
        }

        public Task Invoke(HttpContext context)
        {
            LogContext.PushProperty("TenantId", context.User.FindFirst("TenantId"));
            return _next(context);
        }
    }
}