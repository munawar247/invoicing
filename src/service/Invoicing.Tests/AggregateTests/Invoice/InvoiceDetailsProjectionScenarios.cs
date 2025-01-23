using Kekiri.Xunit;

namespace Invoicing.Tests.AggregateTests.Invoice;

public class InvoiceDetailsProjectionScenarios : InvoiceTestScenariosBase
{
    [Scenario]
    public void TestInvoiceDetailsProjectorCreation()
    {
        Given(We_have_invoice_details_projection)
            .And(We_have_invoice_created_event);
        When(We_project_the_invoice_details);
        Then(The_invoice_details_should_be_projected_correctly);
    }
}