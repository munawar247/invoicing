namespace Invoicing.Messaging.Commands
{
    public record CreateInvoice(
        string? InvoiceId,
        DateTime InvoiceDate,
        LocationInfo Account,
        LocationInfo BillTo,
        LocationInfo Consignee,
        LocationInfo Shipper,
        DateTime CreateDate,
        string Currency,
        List<InvoiceLine> InvoiceLines,
        double? Amount,
        double? AmountDue,
        double? DiscountPercentage,
        double? Taxes,
        bool IsInvoicePosted,
        string Status,
        List<Reference> ReferenceNumbers,
        BankDetails BankInfo,
        string PaymentTerms);
}
