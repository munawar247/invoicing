using Invoicing.Data.Domain;
using Invoicing.Data.Domain.Events;
using Invoicing.Messaging;
using Marten.Events;
using Marten.Events.Aggregation;
using static Invoicing.Data.Domain.Invoice;

namespace Invoicing.Data.Projections;

public class InvoiceDetails
{
    public string Id { get; set; }
    public LocationInfo Account { get; set; }
    public LocationInfo BillTo { get; set; }
    public LocationInfo Consignee { get; set; }
    public LocationInfo Shipper { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime SentDate { get; set; }
    public DateTime DueDate { get; set; }
    public List<InvoiceLine> ListInvoiceLines { get; set; } = new();
    public double? Amount { get; set; }
    public double? AmountDue { get; set; }
    public string Currency { get; set; }
    public double? DiscountPercentage { get; set; }
    public double? Taxes { get; set; }
    public bool IsInvoicePosted { get; set; }
    public InvoiceStatus Status { get; set; }
    public List<Reference> ReferenceNumber { get; set; } = new();
    public BankDetails BankInfo { get; set; }
    public string PaymentTerms { get; set; }
}

public class InvoiceDetailsProjection : SingleStreamProjection<InvoiceDetails>
{
    public InvoiceDetails Create(IEvent<InvoiceCreated> @event)
    {
        var data = @event.Data;
        return new InvoiceDetails
        {
            Id = data.InvoiceId,
            Account = data.Account,
            BillTo = data.BillTo,
            CreateDate = data.CreateDate,
            Currency = data.Currency ?? string.Empty,
            Status = data.Status ?? InvoiceStatus.Draft,
            DiscountPercentage = data.DiscountPercentage,
            Taxes = data.Taxes,
            ReferenceNumber = data.References,
            BankInfo = data.BankInfo,
            PaymentTerms = data.PaymentTerms
        };
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceLineAdded> @event)
    {
        var data = @event.Data;
        var newInvoiceLine = new InvoiceLine
        {
            Id = data.LineId,
            LineNumber = data.LineNumber,
            ShipmentId = data.ShipmentId,
            ShipmentPickupDate = data.ShipmentPickupDate,
            Origin = data.Origin,
            Destination = data.Destination,
            InvoiceLineDate = data.InvoiceLineDate,
            FreightCost = data.FreightCost,
            FreightCharge = data.FreightCharge,
            FuelCost = data.FuelCost,
            FuelCharge = data.FuelCharge,
            TotalCosts = data.TotalCosts,
            TotalCharges = data.TotalCharges,
            Accessorials = data.Accessorials,
            Approvals = data.Approvals
        };
        state.ListInvoiceLines.Add(newInvoiceLine);
        state.Amount += data.TotalCharges;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceSent> @event)
    {
        state.SentDate = @event.Data.SentDate;
        state.Status = InvoiceStatus.Sent;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoicePaid> @event)
    {
        state.AmountDue -= @event.Data.AmountPaid;
        if (state.AmountDue <= 0)
        {
            state.Status = InvoiceStatus.Paid;
        }
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceLineRemoved> @event)
    {
        var data = @event.Data;
        var removeInvoiceLine = state.ListInvoiceLines.First(x => x.Id == data.LineId);
        state.ListInvoiceLines.Remove(removeInvoiceLine);
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceAmountUpdated> @event)
    {
        state.Amount = @event.Data.Amount;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceAmountDueUpdated> @event)
    {
        state.AmountDue = @event.Data.AmountDue;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceStatusUpdated> @event)
    {
        state.Status = @event.Data.Status;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoicePaymentTermsUpdated> @event)
    {
        state.PaymentTerms = @event.Data.PaymentTerms;
    }

    public void Apply(InvoiceDetails state, IEvent<InvoiceBankDetailsUpdated> @event)
    {
        state.BankInfo = @event.Data.BankInfo;
    }
}