using Microsoft.AspNetCore.Authorization;

namespace Invoicing.Service.Authorization
{
    public class AuthorizationService : IAuthorizationRequirement
    {
        public string? Permission { get; }

        public AuthorizationService(string permission)
        {
            Permission = permission ?? throw new ArgumentNullException(nameof(permission));
        }
    }

    public class AuthorizationHandler : AuthorizationHandler<AuthorizationService>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AuthorizationService requirement)
        {
            if (!context.User.HasClaim(c => c.Type == "permissions"))
            {
                return Task.CompletedTask;
            }

            var permissionClaim = context.User.FindFirst(c => c.Type == "permissions" && c.Value == requirement.Permission);

            if (permissionClaim == null)
            {
                return Task.CompletedTask;
            }

            context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
