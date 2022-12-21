using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Models
{
    public class Team_Employee
    {
        public int Id { get; set; }
        public int TeamId { get; set; }
        public  Team _Team { get; set; }

        public int EmployeeId { get; set; }
        public  Employee _Employee { get; set; }
    }
}
