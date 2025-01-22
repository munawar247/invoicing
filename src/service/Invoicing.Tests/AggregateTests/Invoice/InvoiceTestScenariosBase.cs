using Invoicing.Data.Domain;
using Invoicing.Data.Domain.Events;
using Invoicing.Data.Projections;
using Invoicing.Messaging;
using Kekiri.Xunit;
using Marten.Events;

namespace Invoicing.Tests.AggregateTests.Invoice;

public class InvoiceTestScenariosBase : Scenarios
{
    private const string TenantId = "12ae12a3-95b8-41e1-832d-d6f0ed358f95";
    private Data.Domain.Invoice _invoice;
    private Data.Domain.Invoice.InvoiceLine _invoiceLine;
    private DateTime _sentDate;
    private double _amountPaid;

    public void We_have_valid_invoice_data()
    {
        // Arrange
        var account = CreateSampleLocationInfo("Account");
        var billTo = CreateSampleLocationInfo("BillTo");
        var consignee = CreateSampleLocationInfo("Consignee");
        var shipper = CreateSampleLocationInfo("Shipper");
        var createDate = DateTime.UtcNow;
        var currency = "USD";

        _invoice = new Data.Domain.Invoice("T121",account, billTo, consignee, shipper, createDate, currency);
    }

    public void We_create_an_invoice()
    {
        // Act
        // Invoice is already created in the Given step
    }

    public void The_invoice_should_be_initialized_correctly()
    {
        // Assert
        Assert.NotNull(_invoice);
        Assert.Equal("Account", _invoice.Account.Name);
        Assert.Equal("BillTo", _invoice.BillTo.Name);
        Assert.Equal("Consignee", _invoice.Consignee.Name);
        Assert.Equal("Shipper", _invoice.Shipper.Name);
        Assert.Equal(InvoiceStatus.Draft, _invoice.Status);
    }

    public void We_have_a_created_invoice()
    {
        We_have_valid_invoice_data();
    }

    public void We_have_valid_invoice_line_data()
    {
        _invoiceLine = new Data.Domain.Invoice.InvoiceLine
        {
            Id = Guid.NewGuid(),
            LineNumber = 1,
            ShipmentId = "Shipment1",
            ShipmentPickupDate = DateTime.UtcNow,
            Origin = CreateSampleLocationInfo("Origin"),
            Destination = CreateSampleLocationInfo("Destination"),
            InvoiceLineDate = DateTime.UtcNow,
            FreightCost = 100,
            FreightCharge = 150,
            FuelCost = 50,
            FuelCharge = 75,
            TotalCosts = 150,
            TotalCharges = 225
        };
    }

    public void We_add_an_invoice_line()
    {
        _invoice.AddInvoiceLine(_invoiceLine);
    }

    public void The_invoice_line_should_be_added_correctly()
    {
        Assert.Single(_invoice.ListInvoiceLines);
        var addedLine = _invoice.ListInvoiceLines[0];
        Assert.Equal(_invoiceLine.LineNumber, addedLine.LineNumber);
        Assert.Equal(_invoiceLine.ShipmentId, addedLine.ShipmentId);
        Assert.Equal(_invoiceLine.ShipmentPickupDate, addedLine.ShipmentPickupDate);
        Assert.Equal(_invoiceLine.Origin, addedLine.Origin);
        Assert.Equal(_invoiceLine.Destination, addedLine.Destination);
        Assert.Equal(_invoiceLine.InvoiceLineDate, addedLine.InvoiceLineDate);
        Assert.Equal(_invoiceLine.FreightCost, addedLine.FreightCost);
        Assert.Equal(_invoiceLine.FreightCharge, addedLine.FreightCharge);
        Assert.Equal(_invoiceLine.FuelCost, addedLine.FuelCost);
        Assert.Equal(_invoiceLine.FuelCharge, addedLine.FuelCharge);
        Assert.Equal(_invoiceLine.TotalCosts, addedLine.TotalCosts);
        Assert.Equal(_invoiceLine.TotalCharges, addedLine.TotalCharges);
    }

    public void We_have_a_sent_date()
    {
        _sentDate = DateTime.UtcNow;
    }

    public void We_mark_the_invoice_as_sent()
    {
        _invoice.MarkAsSent(_sentDate);
    }

    public void The_invoice_should_be_marked_as_sent()
    {
        Assert.Equal(InvoiceStatus.Sent, _invoice.Status);
        Assert.Equal(_sentDate, _invoice.SentDate);
    }

    public void We_have_an_amount_due()
    {
        _invoice.AmountDue = 200;
    }

    public void We_have_an_amount_paid()
    {
        _amountPaid = 200;
    }

    public void We_mark_the_invoice_as_paid()
    {
        _invoice.MarkAsPaid(_amountPaid);
    }

    public void The_invoice_should_be_marked_as_paid()
    {
        Assert.Equal(0, _invoice.AmountDue);
        Assert.Equal(InvoiceStatus.Paid, _invoice.Status);
    }

    public LocationInfo CreateSampleLocationInfo(string name)
    {
        return new LocationInfo
        {
            Id = Guid.NewGuid(),
            Name = name,
            Address = new Address
            {
                StreetAddress = $"{name} Street",
                City = $"{name} City",
                State = $"{name} State",
                PostalCode = "12345",
                Country = "USA"
            },
            Email = $"{name.ToLower()}@example.com",
            Mobile = "123-456-7890"
        };
    }
}