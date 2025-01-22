using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging.Commands
{
    public class BankDetails
    {
        public string Bank { get; set; }
        public string AccountNumber { get; set; }
        public string Branch { get; set; }
        public string SwiftCode { get; set; }
    }
}
