using Alba;

namespace Invoicing.Tests.Functional.CustomAssertion;

public class ResponseMessageAssertion(string expectedMessage) : IScenarioAssertion
{
    public void Assert(Scenario scenario, AssertionContext context)
    {
        var responseBody = context.ReadBodyAsString();

        if (!responseBody.Contains(expectedMessage))
            context.AddFailure($"Expected message '{expectedMessage}' not found in the response.");
    }
}