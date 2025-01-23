using Invoicing.Data.Domain.Events;
using Invoicing.Data.Projections;
using Invoicing.Messaging;
using Kekiri.Xunit;
using Marten.Events;
using Marten.Metadata;

namespace Invoicing.Tests.AggregateTests.Invoice;

public class InvoiceTestScenariosBase : Scenarios
{
    private const string _tenantId = "12ae12a3-95b8-41e1-832d-d6f0ed358f95";
    private Data.Domain.Invoice _invoice;
    private Data.Domain.Invoice.InvoiceLine _invoiceLine;
    private DateTime _sentDate;
    private double _amountPaid;
    protected InvoiceDetailsProjection? _sut;
    protected InvoiceCreated? _createdEvent;
    protected InvoiceDetails? _result;

    public void We_have_invoice_details_projection()
    {
        Console.WriteLine("Initializing InvoiceDetailsProjection...");
        _sut = new InvoiceDetailsProjection();
        Console.WriteLine("InvoiceDetailsProjection initialized.");
    }
    protected void We_have_invoice_created_event()
    {
        Console.WriteLine("Creating InvoiceCreated event...");
        // Arrange
       // var account = CreateSampleLocationInfo("Account");
        //var billTo = CreateSampleLocationInfo("BillTo");

        var createDate = DateTime.UtcNow;
        var currency = "USD";
        var discountPercentage = 0.0;
        var taxes = 0.0;
        var references = new List<Data.Domain.Invoice.Reference>();
        var bankInfo = new Data.Domain.Invoice.BankDetails();
        var paymentTerms = "Net 30";

        _createdEvent = new InvoiceCreated("T3343121",
            new LocationInfo(), new LocationInfo(),DateTime.UtcNow, currency, discountPercentage,
            taxes,  bankInfo, paymentTerms, InvoiceStatus.Draft, references);
        Console.WriteLine("InvoiceCreated event created.");
    }

    public void We_project_the_invoice_details()
    {
        Console.WriteLine("Projecting invoice details...");
        IEvent<InvoiceCreated> eventWrapper = new CustomIEvent<InvoiceCreated>(_createdEvent!, _tenantId.ToString());
        _result = _sut!.Create(eventWrapper);
        Console.WriteLine("Invoice details projected.");
    }

    public void The_invoice_details_should_be_projected_correctly()
    {
        Console.WriteLine("Checking if the invoice details were projected corect");
        // Assert
        Assert.NotNull(_result);
        Assert.Equal(_createdEvent!.InvoiceId, _result!.Id);
        Assert.Equal(_createdEvent.Account, _result.Account);
        Assert.Equal(_createdEvent.BillTo, _result.BillTo);
        Assert.Equal(_createdEvent.CreateDate, _result.CreateDate);
        Assert.Equal(_createdEvent.Currency, _result.Currency);
        Assert.Equal(_createdEvent.DiscountPercentage, _result.DiscountPercentage);
        Assert.Equal(_createdEvent.Taxes, _result.Taxes);
        Assert.Equal(_createdEvent.BankInfo, _result.BankInfo);
        Assert.Equal(_createdEvent.PaymentTerms, _result.PaymentTerms);
        Assert.Equal(_createdEvent.Status, _result.Status);
        Assert.Equal(_createdEvent.References, _result.ReferenceNumber);
        Console.WriteLine("Invoice details projection check complete.");
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