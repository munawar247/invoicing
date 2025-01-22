using FluentValidation;
using Invoicing.Messaging.Commands;

namespace Invoicing.Messaging.Validators
{
    public class InvoiceLineValidator : AbstractValidator<AddInvoiceLine>
    {
        public InvoiceLineValidator()
        {
            RuleFor(x => x.InvoiceId)
              .NotEmpty().WithMessage("Invoice id cannot be empty.");

            RuleFor(x => x.InvoiceLineId)
              .NotEmpty().WithMessage("Invoice line id cannot be empty.");

            RuleFor(x => x.LineNumber)
              .GreaterThan(0)
              .WithMessage("LineNumber must be greater than zero.");

            RuleFor(x => x.InvoiceLineDate)
              .NotEmpty().WithMessage("Invoice date must not be empty.")
              .Must(BeAValidDate)
              .WithMessage("Invoice date must be a valid date.");
            
        }

        private static bool BeAValidDate(DateTime date)
        {
            return date != DateTime.MinValue && date != DateTime.MaxValue;
        }
    }
}

