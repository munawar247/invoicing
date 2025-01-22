using Oakton;

namespace Invoicing.Service.StartupCommands
{
    public class InitializeArguments
    {

    }

    public class InitializeCommand : OaktonAsyncCommand<InitializeArguments>
    {
        public override Task<bool> Execute(InitializeArguments input)
        {
            return Task.FromResult(true);
        }
    }
}