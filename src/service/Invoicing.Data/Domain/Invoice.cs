using Grc.Utility;
using Invoicing.Data.Domain.Events;
using Invoicing.Messaging;

namespace Invoicing.Data.Domain;

public class Invoice : AggregateBase<string>
{
    public Invoice() : base(string.Empty)
    {
        // Do not use this constructor - it is only for serialization purpose
    }
    public Invoice(string Id, LocationInfo account,
        LocationInfo billTo, LocationInfo consignee,
        LocationInfo shipper, DateTime createDate,
        string currency) : base(Guid.NewGuid().ToString())
    {
        ApplyChange(new InvoiceCreated(Id,
            account, billTo, consignee,
            shipper, createDate, currency,
            InvoiceStatus.Draft)
        );
    }
    public LocationInfo Account { get;  set; }
    public LocationInfo BillTo { get;  set; }
    public LocationInfo Consignee { get;  set; }
    public LocationInfo Shipper { get;  set; }
    public DateTime CreateDate { get;  set; }
    public DateTime SentDate { get;  set; }
    public DateTime DueDate { get;  set; }
    public List<InvoiceLine> ListInvoiceLines { get;  set; } = new();
    public double? Amount { get;  set; }
    public double? AmountDue { get;  set; }
    public string Currency { get;  set; }
    public double? DiscountPercentage { get;  set; }
    public double? Taxes { get;  set; }
    public bool IsInvoicePosted { get;  set; }
    public InvoiceStatus Status { get;  set; }
    public List<Reference> ReferenceNumber { get;  set; } = new();
    public BankDetails BankInfo { get;  set; }
    public string PaymentTerms { get;  set; }

    // Methods to handle domain behavior
    public void AddInvoiceLine(InvoiceLine line)
    {
        //ListInvoiceLines.Add(line);
        ApplyChange(new InvoiceLineAdded(
            Id, line.Id, line.LineNumber, line.ShipmentId, line.ShipmentPickupDate,
            line.Origin, line.Destination, line.InvoiceLineDate, line.FreightCost,
            line.FreightCharge, line.FuelCost, line.FuelCharge, line.TotalCosts,
            line.TotalCharges, line.Accessorials, line.Approvals));
    }

    public void MarkAsSent(DateTime sentDate)
    {
        ApplyChange(new InvoiceSent(Id, sentDate));
    }

    public void MarkAsPaid(double amountPaid)
    {
        ApplyChange(new InvoicePaid(Id, amountPaid));
    }

    public void Apply(InvoiceCreated e)
    {
        Id = e.InvoiceId;
        Account = e.Account;
        BillTo = e.BillTo;
        Consignee = e.Consignee;
        Shipper = e.Shipper;
        CreateDate = e.CreateDate;
        Currency = e.Currency;
        Status = e.Status;
    }

    public void Apply(InvoiceLineAdded e)
    {
        var line = new InvoiceLine
        {
            Id = e.LineId,
            LineNumber = e.LineNumber,
            ShipmentId = e.ShipmentId,
            ShipmentPickupDate = e.ShipmentPickupDate,
            Origin = e.Origin,
            Destination = e.Destination,
            InvoiceLineDate = e.InvoiceLineDate,
            FreightCost = e.FreightCost,
            FreightCharge = e.FreightCharge,
            FuelCost = e.FuelCost,
            FuelCharge = e.FuelCharge,
            TotalCosts = e.TotalCosts,
            TotalCharges = e.TotalCharges,
            Accessorials = e.Accessorials,
            Approvals = e.Approvals
        };
        ListInvoiceLines.Add(line);
    }

    public void Apply(InvoiceSent e)
    {
        SentDate = e.SentDate;
        Status = InvoiceStatus.Sent;
    }

    public void Apply(InvoicePaid e)
    {
        AmountDue -= e.AmountPaid;
        if (AmountDue <= 0)
        {
            Status = InvoiceStatus.Paid;
        }
    }

    public class InvoiceLine
    {
        public Guid Id { get; set; }
        public int LineNumber { get; set; }
        public string ShipmentId { get; set; }
        public DateTime ShipmentPickupDate { get; set; }
        public LocationInfo Origin { get; set; }
        public LocationInfo Destination { get; set; }
        public DateTime InvoiceLineDate { get; set; }
        public double? FreightCost { get; set; }
        public double? FreightCharge { get; set; }
        public double? FuelCost { get; set; }
        public double? FuelCharge { get; set; }
        public double? TotalCosts { get; set; }
        public double? TotalCharges { get; set; }
        public List<AccessorialCharge> Accessorials { get; set; } = new();
        public List<ChargeApproval> Approvals { get; set; } = new();
    }
    

    public class Reference
    {
        public string Id { get; set; }
        public string ReferenceType { get; set; }
        public string ReferenceNumber { get; set; }
    }

    public class BankDetails
    {
        public string Bank { get; set; }
        public string AccountNumber { get; set; }
        public string Branch { get; set; }
        public string SwiftCode { get; set; }
    }
   
}
