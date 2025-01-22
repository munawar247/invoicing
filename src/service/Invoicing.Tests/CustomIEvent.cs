using Marten.Events;

namespace Invoicing.Tests;

public class CustomIEvent<T>() : IEvent<T> where T : class
{
    public Guid Id { get; set; }
    public string TenantId { get; set; } = string.Empty;
    public T Data { get; set; } = null!;

    public CustomIEvent(T data, string tenantId) : this()
    {
        Id = Guid.NewGuid();
        TenantId = tenantId;
        Data = data;
    }

    // These are Marten IEvent base interface members
    public Guid EventId => Id;
    public long Version { get; set; }
    public Guid StreamId { get; set; }
    public long Sequence { get; set; }
    public string? AggregateTypeName { get; set; }
    public string? CausationId { get; set; }
    public string? CorrelationId { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public string? StreamKey { get; set; }
    public string EventTypeName { get; set; } = string.Empty;
    public string DotNetTypeName { get; set; } = string.Empty;
    public Dictionary<string, object>? Headers { get; set; }
    public bool IsArchived { get; set; }
    public Type EventType => throw new NotImplementedException();

    public void SetHeader(string key, object value)
    {
        throw new NotImplementedException();
    }

    public object GetHeader(string key)
    {
        throw new NotImplementedException();
    }

    object IEvent.Data => Data;
}