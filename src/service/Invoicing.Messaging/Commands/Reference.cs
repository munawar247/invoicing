using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging.Commands
{
    public class Reference
    {
        public string Id { get; set; } = string.Empty;
        public string ReferenceType { get; set; } = string.Empty;
        public string ReferenceNumber { get; set; } = string.Empty;
    }
}
