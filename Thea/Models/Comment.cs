using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }

        public string Body { get; set; }

        public string Name { get; set; }

        public DateTime PostedDate { get; set; }
        [Required]
        public int BlogId { get; set; }
        [ForeignKey("BlogId")]
        public virtual Blog Blog { get; set; }
    }
}
