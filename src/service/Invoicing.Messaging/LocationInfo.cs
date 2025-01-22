using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Invoicing.Messaging
{
    public class LocationInfo
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public Address? Address { get; set; }
        public LocationInfo CareOf { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
    }
    public class Address
    {
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string? Country { get; set; }
    }
}
