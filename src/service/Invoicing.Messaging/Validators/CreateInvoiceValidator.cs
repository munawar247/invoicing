using FluentValidation;
using Invoicing.Messaging.Commands;

namespace Invoicing.Messaging.Validators
{
    public class CreateInvoiceValidator : AbstractValidator<CreateInvoice>
    {
        public CreateInvoiceValidator()
        {
            RuleFor(x => x.InvoiceId)
               .NotEmpty().WithMessage("InvoiceId cannot be null or empty.");

            RuleFor(x => x.InvoiceDate)
                .NotEmpty().WithMessage("Invoicedate must not be empty.")
                .Must(BeAValidDate)
                .WithMessage("Invoicedate must be a valid date.");

          
        }

        private static bool BeAValidDate(DateTime date)
        {
            return date != DateTime.MinValue && date != DateTime.MaxValue;
        }

        private static bool BeAValidGuid(string id)
        {
            return id != string.Empty;
        }
    }
}
