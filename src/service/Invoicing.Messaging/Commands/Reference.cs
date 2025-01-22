using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging.Commands
{
    public class Reference
    {
        public string Id { get; set; }
        public string ReferenceType { get; set; }
        public string ReferenceNumber { get; set; }
    }
}
