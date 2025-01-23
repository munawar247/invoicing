using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging.Commands
{
    public class InvoiceLine
    {
        public Guid Id { get; set; }
        public int LineNumber { get; set; }
        public string ShipmentId { get; set; } = string.Empty;
        public DateTime ShipmentPickupDate { get; set; }
        public LocationInfo Origin { get; set; } = new();
        public LocationInfo Destination { get; set; } = new();
        public DateTime InvoiceLineDate { get; set; }
        public double? FreightCost { get; set; }
        public double? FreightCharge { get; set; }
        public double? FuelCost { get; set; }
        public double? FuelCharge { get; set; }
        public double? TotalCosts { get; set; }
        public double? TotalCharges { get; set; }
        public List<AccessorialCharge> Accessorials { get; set; } = new();
        public List<ChargeApproval>? Approvals { get; set; } = new();
    }
}
