using AutoMapper;
using Invoicing.Data.Domain;
using Invoicing.Messaging.Commands;
using Invoicing.Service.Configuration;
using Marten;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Wolverine.Http;

namespace Invoicing.Service.Endpoints;

[Authorize(Policy = "InvoicingPolicy")]
public class CreateInvoiceEndPoint
{
    public async Task<(ProblemDetails, CreateInvoice)> Before(
        CreateInvoice message,
        IQuerySession querySession,
        ILogger<CreateInvoiceEndPoint> logger,
        ErrorMessages errorMessages)
    {
        var invoiceExists = await querySession.Events.AggregateStreamAsync<Invoice>(message.InvoiceId!);
        if (invoiceExists is not null)
        {
            logger.LogDebug("Invoice id '{InvoiceId}' already exists.", message.InvoiceId);

            return (new ProblemDetails
            {
                Detail = errorMessages.InvoiceAlreadyExists(message.InvoiceId ?? string.Empty),
                Status = (int)HttpStatusCode.Conflict
            }, message);
        }

        foreach (var item in message.InvoiceLines)
        {
            var shipmentInvoice = await querySession.Query<Invoice>()
                .Where(i => i.ListInvoiceLines.Any(l => l.ShipmentId == item.ShipmentId))
                .FirstOrDefaultAsync();

            if (shipmentInvoice != null)
            {
                logger.LogInformation("Shipment '{ShipmentId}' already attached to invoice '{InvoiceId}'.",
                    item.ShipmentId, shipmentInvoice.Id);

                return (new ProblemDetails
                {
                    Detail = errorMessages.ShipmentAlreadyAttachedToInvoice(item.ShipmentId),
                    Status = (int)HttpStatusCode.Conflict
                }, message);
            }
        }

        return (WolverineContinue.NoProblems, message);
    }

    [WolverinePost(AvailableResources.CreateInvoice)]
    public async Task<IResult> Create(
        CreateInvoice message,
        IDocumentSession documentSession,
        ILogger<CreateInvoiceEndPoint> logger,
        IMapper mapper)
    {
        logger.LogDebug("Generating invoice '{InvoiceId}'.", message.InvoiceId);

        var invoice = new Invoice(message.InvoiceId,
            message.Account,
            message.BillTo,
            message.Consignee,
            message.Shipper,
            message.InvoiceDate,
            message.Currency);
        double totalAmount = 0; int lineNumber = 0;

        foreach (var lineItem in message.InvoiceLines)
        {
            var invoiceLine = new Invoice.InvoiceLine
            {
                Id = Guid.NewGuid(),
                LineNumber = lineNumber++,
                ShipmentId = lineItem.ShipmentId,
                ShipmentPickupDate = lineItem.ShipmentPickupDate,
                Origin = lineItem.Origin,
                Destination = lineItem.Destination,
                InvoiceLineDate = message.InvoiceDate,
                FreightCharge = lineItem.FreightCharge,
                FreightCost = lineItem.FreightCost,
                FuelCharge = lineItem.FuelCharge,
                FuelCost = lineItem.FuelCost,
                TotalCharges = lineItem.FreightCharge + lineItem.FuelCharge
                                                      + lineItem.Accessorials?.Sum(a=>a.Charge) ?? 0,
                TotalCosts = lineItem.FreightCost + lineItem.FuelCost
                                                      + lineItem.Accessorials?.Sum(a => a.Cost) ?? 0,
                Accessorials = lineItem.Accessorials
            };
            double lineTotal = invoiceLine.TotalCharges ?? 0;
            lineTotal += invoiceLine.Accessorials?.Sum(a => a.Charge) ?? 0;

            totalAmount += lineTotal;
            invoice.AddInvoiceLine(invoiceLine);
        }

        invoice.Amount = totalAmount;

        documentSession.Events.StartStream<Invoice>(invoice.Id, invoice.GetUncommittedChanges(true));
        await documentSession.SaveChangesAsync();

        return Results.Ok(new { message.InvoiceId, Message = "Invoice generated successfully." });
    }
}
