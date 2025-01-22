using Microsoft.AspNetCore.Http.Features;

namespace Invoicing.Service.Startup
{
    public class MetricsTenantMiddleware
    {
        private readonly RequestDelegate _next;

        public MetricsTenantMiddleware(RequestDelegate next) => _next = next;

        public Task Invoke(HttpContext context)
        {
            var tagsFeature = context.Features.Get<IHttpMetricsTagsFeature>();

            if (tagsFeature == null || context.User.Identity == null)
                return _next(context);

            tagsFeature.Tags.Add(new KeyValuePair<string, object?>("TenantId", context.User.FindFirst("TenantId")));

            return _next(context);
        }
    }
}
