using AutoMapper;
using Invoicing.Data.Domain;
using Invoicing.Service.Configuration;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Invoicing.Data.Projections;
using Wolverine.Http;

namespace Invoicing.Service.Endpoints;

[Authorize(Policy = "InvoicingPolicy")]
public class GetInvoicesEndpoint
{
    [WolverineGet(AvailableResources.GetInvoices)]
    public async Task<IResult> Get(
        [FromQuery] string accountId,
        [FromQuery] string billToId,
        [FromQuery] DateTime? invoiceCreationFromDate,
        [FromQuery] DateTime? invoiceCreationToDate,
        IQuerySession querySession,
        ILogger<GetInvoicesEndpoint> logger,
        IMapper mapper)
    {
        logger.LogDebug("Fetching invoices for account '{AccountId}', billTo '{BillToId}', from date '{InvoiceCreationFromDate}', to date '{InvoiceCreationToDate}'.",
            accountId, billToId, invoiceCreationFromDate, invoiceCreationToDate);

        var query = querySession.Query<InvoiceDetails>().AsQueryable();
        if (!string.IsNullOrEmpty(accountId) && Guid.TryParse(accountId, out var accountIdGuid))
        {
            query = query.Where(i => i.Account.Id == accountIdGuid);
        }

        if (!string.IsNullOrEmpty(billToId) && Guid.TryParse(billToId, out var billToIdGuid))
        {
            query = query.Where(i => i.BillTo.Id == billToIdGuid);
        }

        if (invoiceCreationFromDate.HasValue)
        {
            query = query.Where(i => i.CreateDate >= invoiceCreationFromDate.Value);
        }

        if (invoiceCreationToDate.HasValue)
        {
            query = query.Where(i => i.CreateDate <= invoiceCreationToDate.Value);
        }

        var invoices = await query.ToListAsync();
       

        return Results.Ok(invoices);
    }
}