using Grc.Utility;
using System.Globalization;

namespace Invoicing.Service;
public class ErrorMessages : LocalizedMessageFactoryBase<ErrorMessages>
{
    protected override string Prefix => "IN-";
    public override CultureInfo[] SupportedCultures => new CultureInfo[]
    {
            CultureInfo.InvariantCulture,
            CultureInfo.GetCultureInfo("en"),
            CultureInfo.GetCultureInfo("es"),
    };

    public string InvoiceDoesNotExist(string invoiceId)
    {
        return this.ToString(1000, invoiceId);
    }

    public string ShipmentChargeAlreadyExists(string shipmentId, string invoiceId)
    {
        return this.ToString(1001, shipmentId, invoiceId);
    }

    public string InvoiceAlreadyExists(string invoiceId)
    {
        return this.ToString(1002, invoiceId);
    }

    public string ShipmentAlreadyAttachedToInvoice(string shipmentId)
    {
        return this.ToString(1003, shipmentId);
    }

    public string InvoiceAlreadyPosted(string invoiceId)
    {
        return this.ToString(1004, invoiceId);
    }
}
