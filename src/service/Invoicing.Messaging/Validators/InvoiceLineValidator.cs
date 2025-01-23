using FluentValidation;
using Invoicing.Messaging.Commands;

namespace Invoicing.Messaging.Validators;

public class InvoiceLineValidator : AbstractValidator<InvoiceLine>
{
    public InvoiceLineValidator()
    {
        RuleFor(line => line.Id).Must(id => id != Guid.Empty).WithMessage("Invoice line ID must be a valid GUID.");
        RuleFor(line => line.LineNumber).GreaterThan(0).WithMessage("Line number must be greater than 0.");
        RuleFor(line => line.ShipmentId).NotEmpty().WithMessage("Shipment ID is required.");
        RuleFor(line => line.ShipmentPickupDate).Must(BeAValidDate).WithMessage("Shipment pickup date is invalid.");
        RuleFor(line => line.Origin).NotNull().WithMessage("Origin is required.");
        RuleFor(line => line.Destination).NotNull().WithMessage("Destination is required.");
        RuleFor(line => line.InvoiceLineDate).Must(BeAValidDate).WithMessage("Invoice line date is invalid.");
        //RuleFor(line => line.FreightCost).GreaterThanOrEqualTo(0).WithMessage("Freight cost must be greater than or equal to 0.");
        //RuleFor(line => line.FreightCharge).GreaterThanOrEqualTo(0).WithMessage("Freight charge must be greater than or equal to 0.");
        //RuleFor(line => line.FuelCost).GreaterThanOrEqualTo(0).WithMessage("Fuel cost must be greater than or equal to 0.");
        //RuleFor(line => line.FuelCharge).GreaterThanOrEqualTo(0).WithMessage("Fuel charge must be greater than or equal to 0.");
        //RuleFor(line => line.TotalCosts).GreaterThanOrEqualTo(0).WithMessage("Total costs must be greater than or equal to 0.");
        //RuleFor(line => line.TotalCharges).GreaterThanOrEqualTo(0).WithMessage("Total charges must be greater than or equal to 0.");
    }

    private static bool BeAValidDate(DateTime date)
    {
        return date != DateTime.MinValue && date != DateTime.MaxValue;
    }

}