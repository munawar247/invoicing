namespace Invoicing.Service.Configuration
{
    public static class AvailableResources
    {
        public const string Invoices = "invoices";
        public const string CreateInvoice = $"/{Invoices}";
        public const string PostInvoice = $"/{Invoices}/post";
        public const string AddInvoiceLine = $"/{Invoices}/line";
        public const string GetInvoices = $"/{Invoices}/get";

    }
}
