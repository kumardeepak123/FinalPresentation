using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Dtos
{
    public class ProjectDto
    {

        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Technology { get; set; }
        public string FRequirement { get; set; }
        public string NFRequirement { get; set; }
        public long Budget { get; set; }
        public string Status { get; set; }

        public ClientWithIdAndName Client { get; set; }
        public ICollection<TeamWithIdAndNameDto> Teams { get; set; }

    }
}
