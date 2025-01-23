using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging.Commands
{
    public class BankDetails
    {
        public string Bank { get; set; } = string.Empty;
        public string AccountNumber { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public string SwiftCode { get; set; } = string.Empty;
    }
}
