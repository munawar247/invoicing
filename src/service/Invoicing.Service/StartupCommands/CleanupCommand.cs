using Oakton;

namespace Invoicing.Service.StartupCommands
{
    public class CleanupArguments
    {

    }

    public class CleanupCommand : OaktonAsyncCommand<CleanupArguments>
    {
        public override Task<bool> Execute(CleanupArguments input)
        {
            return Task.FromResult(true);
        }
    }
}