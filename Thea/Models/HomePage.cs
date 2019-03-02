using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class HomePage
    {
        public int Id { get; set; }

        public string WelcomeBlockHeading { get; set; }

        public string WelcomeBlockSubHeading { get; set; }

        public string WelcomeBlockContent { get; set; }

        public string MissionStatementBlockHeading { get; set; }

        public string MissionStatementBlockContent { get; set; }

        public string EmbededVideoUrl { get; set; }

        public string VideoDescription { get; set; }
    }
}
