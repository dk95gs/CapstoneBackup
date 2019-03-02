using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class StorePage
    {
        public int Id { get; set; }

        public string Heading { get; set; }

        public string Description { get; set; }

        public string PurchaseInfo { get; set; }

        public string LocationList { get; set; }
    }
}
