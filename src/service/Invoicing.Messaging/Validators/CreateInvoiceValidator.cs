using FluentValidation;
using Invoicing.Messaging.Commands;

namespace Invoicing.Messaging.Validators
{
    public class CreateInvoiceValidator : AbstractValidator<CreateInvoice>
    {
        public CreateInvoiceValidator()
        {
            RuleFor(invoice => invoice.Account.Id)
                .NotEmpty().WithMessage("Account ID is required.");
            RuleFor(invoice => invoice.BillTo.Id)
                .NotEmpty().WithMessage("BillTo ID is required.");

            RuleFor(invoice => invoice.InvoiceLines)
                .NotEmpty().WithMessage("Invoice must have at least one invoice line.")
                .ForEach(line =>
                {
                    line.NotNull().WithMessage("Invoice line cannot be null.");
                    line.SetValidator(new InvoiceLineValidator());
                });
        }

        private static bool BeAValidDate(DateTime date)
        {
            return date != DateTime.MinValue && date != DateTime.MaxValue;
        }

        private static bool BeAValidGuid(string id)
        {
            return Guid.TryParse(id, out _);
        }
    }
}
