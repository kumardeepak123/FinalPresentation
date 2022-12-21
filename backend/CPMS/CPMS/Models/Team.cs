using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Models
{
    public class Team
    {
        public int Id { get; set; }

        [MaxLength(30)]
        [Column(TypeName = "varchar(20)")]
        public string Name { get; set; }


        public int? ProjectId { get; set; }
        public Project Project { get; set; }

        public  List<Team_Employee> _Team_Employees { get; set; }

    }
}
