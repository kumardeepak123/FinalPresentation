using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CPMS.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        [Column(TypeName = "varchar(30)")]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required, MaxLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string Technology { get; set; }

        [Required]       
        [Column(TypeName = "varchar(1000)")]
        public string FRequirement { get; set; }

        [Required]
        [Column(TypeName = "varchar(1000)")]
        public string NFRequirement { get; set; }

        [Required]
        public long Budget { get; set; }


        [Column(TypeName = "varchar(12)")]
        public string Status { get; set; }

        public List<Client_Project> Client_Projects { get; set; }
        public List<Team> Teams { get; set; }
    }

}
