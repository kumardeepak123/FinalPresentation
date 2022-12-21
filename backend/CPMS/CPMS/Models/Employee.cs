using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [MaxLength(30)]
        [Column(TypeName = "varchar(15)")]
        public string Name { get; set; }

        [MaxLength(30)]
        [DataType(DataType.EmailAddress)]
        [Column(TypeName = "varchar(30)")]
        public string Email { get; set; }

        [MaxLength(15)]
        [Column(TypeName = "varchar(8)")]
        public string Password { get; set; }

        [MaxLength(11)]
        [Column(TypeName = "varchar(11)")]
        public string Phone { get; set; }

        [MaxLength(30)]
        [Column(TypeName = "varchar(30)")]
        public string Designation { get; set; }

        
        [Column(TypeName = "varchar(15)")]
        public string Role { get; set; }

        public List<Team_Employee> _Team_Employees { get; set; }

    }
}
