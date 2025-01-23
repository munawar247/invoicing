using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging
{
    public class AccessorialCharge
    {
        public string Name { get; set; } = string.Empty;
        public double Cost { get; set; }
        public double Charge { get; set; }
    }
}
