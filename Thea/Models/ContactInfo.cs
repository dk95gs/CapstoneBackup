using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class ContactInfo
    {
        public int Id { get; set; }

        public string StreetName { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string Country { get; set; }
        public string PostalCode { get; set; }

        public string LocalNumber { get; set; }

        public string TollFreeNumber { get; set; }

        public string Email { get; set; }

        public string FooterMessage { get; set; }

        public string HeaderHeading { get; set; }

        public string HeaderSubHeading { get; set; }

    }
}
