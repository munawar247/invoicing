namespace Invoicing.Messaging.Commands
{
    public record AddInvoiceLine(
        string InvoiceId,
        Guid InvoiceLineId,
        int LineNumber,
        string ShipmentId,
        DateTime ShipmentPickupDate,
        LocationInfo Origin,
        LocationInfo Destination,
        DateTime InvoiceLineDate,
        double? FreightCost,
        double? FreightCharge,
        double? FuelCost,
        double? FuelCharge,
        double? TotalCosts,
        double? TotalCharges,
        List<AccessorialCharge> Accessorials,
        List<ChargeApproval> Approvals,
        bool OnHold);
}
