using Grc.Utility;
using Grc.Utility.Settings;
using Messaging.Tenant;
using Microsoft.Extensions.Options;
using Wolverine;

namespace Invoicing.Service.Handlers;

public class TenantActivatedHandler
{
    public async Task HandleAsync(
        TenantActivated message,
        IOptions<ApplicationInfo> applicationInfo,
        SettingsClient settingsClient,
        IOptions<TenantSettings> tenantSettings,
        Envelope envelope,
        ILogger<TenantActivatedHandler> logger)
    {
        var tenantIdAsGuid = envelope.TenantIdAsGuid();
        // await settingsClient.GetSettings(new List<Guid> { tenantIdAsGuid }, tenantSettings.Value.Settings);
        logger.LogDebug("Handling tenant activation for '{TenantId}' in the '{AppName}'.", message.TenantId, applicationInfo.Value.Name);

        //Implementation in specific micro service.
    }
}