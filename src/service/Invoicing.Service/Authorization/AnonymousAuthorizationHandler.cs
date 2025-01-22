using Microsoft.AspNetCore.Authorization;

namespace Invoicing.Service.Authorization
{
    /// <summary>
    /// This authorisation handler will bypass all requirements
    /// </summary>
    public class AnonymousAuthorizationHandler : IAuthorizationHandler
    {
        public Task HandleAsync(AuthorizationHandlerContext context)
        {
            foreach (IAuthorizationRequirement requirement in context.PendingRequirements.ToList())
                context.Succeed(requirement); //Simply pass all requirements

            return Task.CompletedTask;
        }
    }
}
