﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class ShopItems
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageURL { get; set; }
        public double Price { get; set; }

        public string Code { get; set; }
    }
}
