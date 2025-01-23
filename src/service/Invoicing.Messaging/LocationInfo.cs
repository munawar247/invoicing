namespace Invoicing.Messaging;

public class LocationInfo
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Address? Address { get; set; }
    public LocationInfo? CareOf { get; set; } 
    public string Email { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
}
public class Address
{
    public string StreetAddress { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
    public string? Country { get; set; } = string.Empty;
}