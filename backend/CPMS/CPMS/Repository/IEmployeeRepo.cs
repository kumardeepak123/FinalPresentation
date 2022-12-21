using CPMS.Dtos;
using CPMS.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IEmployeeRepo
    {
         Task<bool> CreateEmployee(EmployeeDto employee); //Done
          Task<IEnumerable> GetEmployee(int? id); //Done


        Task<bool> UpdateEmployee(int id, EmployeeDto employee); //Done
        Task<bool> DeleteEmployee(int id); //Done
        //Task<ICollection<Employee>> GetEmployeesForTeamUp(); //Done
    }
}
