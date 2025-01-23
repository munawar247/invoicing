namespace Invoicing.Messaging.Commands
{
    public record CreateInvoice(
        string? InvoiceId,
        LocationInfo Account,
        LocationInfo BillTo,
        
        //DateTime CreateDate, 
        string? Currency, //Need to get from settings
        List<InvoiceLine> InvoiceLines,
        //double? Amount, // Calculate from InvoiceLines
        //double? AmountDue, // Calculate from InvoiceLines
        double? DiscountPercentage, // Need to get from settings
        double? Taxes, // Need to get from settings
        //bool IsInvoicePosted, // Set to false default while creation
        //InvoiceStatus Status,  // Need to set default value
        List<Reference>? ReferenceNumbers,
        BankDetails? BankInfo, //Need to get from settings
        string? PaymentTerms  // Need to get from settings
        );
}
