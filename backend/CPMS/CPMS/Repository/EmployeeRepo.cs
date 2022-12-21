using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using CPMS.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private  readonly CPMDbContext _CPMDbContext;
        private readonly IMapper _IMapper;

        public EmployeeRepo(CPMDbContext  cPMDbContext, IMapper  mapper)
        {
            _CPMDbContext =  cPMDbContext;
            _IMapper = mapper;

        }
        public async Task<bool> CreateEmployee(EmployeeDto employee)
        {
            var _Employee = _IMapper.Map<Employee>(employee);


            try
            {
                _CPMDbContext.Employees.Add(_Employee);
                await _CPMDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }


            return true;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var _employee = await _CPMDbContext.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (_employee == null) return false;

            try
            {
                _CPMDbContext.Employees.Remove(_employee);
                await _CPMDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        public async Task<IEnumerable> GetEmployee(int? id)
        {
            if (id != null)
            {

                var emp = await _CPMDbContext.Employees.Where(x => x.Id == id).ToListAsync();
                if (emp == null) return null;
                return _IMapper.Map<List<EmployeeDto>>(emp);
            }
            else
            {
                var emps = await _CPMDbContext.Employees.Where(x=>x.Role == "Employee").ToListAsync();

                if (emps == null || emps.Count == 0) return null;
                return emps;
            }

           // return null;
        }
        //public async Task<ICollection<Employee>> GetEmployeesForTeamUp()
        //{
        //    HashSet<int> empIds = new HashSet<int>();
        //    var _Employees_belongs_to_teams = await _CPMDbContext.Team_Employees.ToListAsync();
        //    foreach(var r in _Employees_belongs_to_teams)
        //    {
        //        empIds.Add(r.EmployeeId);
        //    }
        //    var _Employees = await _CPMDbContext.Employees.Where(x => empIds.Contains(x.Id)== false && x.Role=="Employee").ToListAsync();

        //    return _Employees;
           
        //}

        public async Task<bool> UpdateEmployee(int id, EmployeeDto employee)
        {
            var _Employee = await _CPMDbContext.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (_Employee == null) return false;

            _Employee.Name = employee.Name;
            _Employee.Password = employee.Password;
            _Employee.Email = employee.Email;
            _Employee.Designation = employee.Designation;
            _Employee.Phone = employee.Phone;
            _Employee.Role = employee.Role;

            try
            {
                await _CPMDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        
    }
}
