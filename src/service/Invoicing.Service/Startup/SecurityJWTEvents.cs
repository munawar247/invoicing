using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Invoicing.Service.Startup
{
    public class SecurityJwtEvents : JwtBearerEvents
    {
        private readonly ILogger<SecurityJwtEvents> _logger;

        public SecurityJwtEvents(ILogger<SecurityJwtEvents> logger)
        {
            _logger = logger;
        }

        public override Task AuthenticationFailed(AuthenticationFailedContext context)
        {
            _logger.LogWarning("Token Validation Failed {Failure}", context.Result.Failure);
            return base.AuthenticationFailed(context);
        }

        //Enable this if you want to see info in the token
        // public override Task TokenValidated(TokenValidatedContext context)
        // {
        //     return base.TokenValidated(context);
        // }
    }
}
