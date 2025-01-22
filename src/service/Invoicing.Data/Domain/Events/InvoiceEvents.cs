using Invoicing.Messaging;

namespace Invoicing.Data.Domain.Events;

public record InvoiceCreated(
    string InvoiceId,
    LocationInfo Account,
    LocationInfo BillTo,
    LocationInfo Consignee,
    LocationInfo Shipper,
    DateTime CreateDate,
    string Currency,
    InvoiceStatus Status
);

public record InvoiceLineAdded(
    string InvoiceId,
    Guid LineId,
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
    List<ChargeApproval> Approvals
);

public record InvoiceSent(
    string InvoiceId,
    DateTime SentDate
);

public record InvoicePaid(
    string InvoiceId,
    double AmountPaid
);

public record InvoiceLineRemoved(
    string InvoiceId,
    Guid LineId
);

public record InvoiceAmountUpdated(
    string InvoiceId,
    double? Amount
);

public record InvoiceAmountDueUpdated(
    string InvoiceId,
    double? AmountDue
);

public record InvoiceStatusUpdated(
    string InvoiceId,
    InvoiceStatus Status
);

public record InvoicePaymentTermsUpdated(
    string InvoiceId,
    string PaymentTerms
);

public record InvoiceBankDetailsUpdated(
    string InvoiceId,
    Invoice.BankDetails BankInfo
);