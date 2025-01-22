using Serilog.Context;
using Wolverine;

namespace Invoicing.Service.Startup
{
    public class PropertyWrapper
    {
        public IDisposable? Instance { get; set; }
    }

    public class CorrelationLoggingMiddleware
    {
        public PropertyWrapper Load(Envelope e)
        {
            return new PropertyWrapper()
            {
                Instance = LogContext.PushProperty("CorrelationId", e.CorrelationId ?? null)
            };
        }

        public void Finally(PropertyWrapper? property)
        {
            property?.Instance?.Dispose();
        }
    }
}
