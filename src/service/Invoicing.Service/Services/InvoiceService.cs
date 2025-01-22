using Invoicing.Data.Projections;
using Marten;
using Invoicing.Data.Domain;
using Invoicing.Messaging.Commands;

namespace Invoicing.Service.Services
{
    public interface IInvoiceService
    {
        Task<InvoiceDetails?> GetInvoiceDetails(string invoiceId);
       
        Task AddInvoiceLine(AddInvoiceLine command);
        Task CreateInvoice(CreateInvoice command);
    }

    public class InvoiceService : IInvoiceService
    {
        private readonly IDocumentSession _documentSession;

        public InvoiceService(IDocumentSession documentSession)
        {
            _documentSession = documentSession;
        }

        public async Task<InvoiceDetails?> GetInvoiceDetails(string invoiceId)
        {
            var invoiceDetails = await _documentSession.Query<InvoiceDetails>()
                                            .FirstOrDefaultAsync(item => item.Id == invoiceId);

            return invoiceDetails ?? null;
        }

       

        public async Task AddInvoiceLine(AddInvoiceLine command)
        {
            var invoice = await _documentSession.Events.AggregateStreamAsync<Invoice>(command.InvoiceId);
            if (invoice != null)
            {
                var invoiceLine = new Invoice.InvoiceLine
                {
                    Id = command.InvoiceLineId,
                    LineNumber = command.LineNumber,
                    ShipmentId = command.ShipmentId,
                    ShipmentPickupDate = command.ShipmentPickupDate,
                    Origin = command.Origin,
                    Destination = command.Destination,
                    InvoiceLineDate = command.InvoiceLineDate,
                    FreightCost = command.FreightCost,
                    FreightCharge = command.FreightCharge,
                    FuelCost = command.FuelCost,
                    FuelCharge = command.FuelCharge,
                    TotalCosts = command.TotalCosts,
                    TotalCharges = command.TotalCharges,
                    Accessorials = command.Accessorials,
                    Approvals = command.Approvals,
                };
                invoice.AddInvoiceLine(invoiceLine);
                _documentSession.Events.Append(command.InvoiceId, invoice.GetUncommittedChanges());
                await _documentSession.SaveChangesAsync();
            }
        }

        public async Task CreateInvoice(CreateInvoice command)
        {
            var invoice = new Invoice(command.InvoiceId,
                command.Account,
                command.BillTo,
                command.Consignee,
                command.Shipper,
                command.CreateDate,
                command.Currency
            );
            _documentSession.Events.StartStream<Invoice>(invoice.Id, invoice.GetUncommittedChanges());
            await _documentSession.SaveChangesAsync();
        }
    }
}