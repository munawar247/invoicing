using Alba;

namespace Invoicing.Tests.Functional.CustomAssertion;

public static class ScenarioExtensions
{
    public static Scenario ResponseMessageShouldBe(this Scenario scenario, string expectedMessage)
    {
        return scenario.AssertThat(new ResponseMessageAssertion(expectedMessage));
    }
}