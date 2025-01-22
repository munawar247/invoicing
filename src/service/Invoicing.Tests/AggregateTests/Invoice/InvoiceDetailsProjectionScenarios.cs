using Kekiri.Xunit;

namespace Invoicing.Tests.AggregateTests.Invoice;

public class InvoiceDetailsProjectionScenarios : InvoiceTestScenariosBase
{
    [Scenario]
    public void TestInvoiceDetailsProjectorCreation()
    {
        Given(We_have_valid_invoice_data);
        When(We_create_an_invoice);
        Then(The_invoice_should_be_initialized_correctly);
    }
}