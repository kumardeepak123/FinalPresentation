using CPMS.Dtos;
using CPMS.Models;
using CPMS.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _IEmployeeRepo;

        public EmployeeController(IEmployeeRepo  iEmployeeRepo)
        {
            _IEmployeeRepo = iEmployeeRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> CreateEmployee(EmployeeDto employee)
        {
            var res = await _IEmployeeRepo.CreateEmployee(employee);
            if (!res)
            {
                return StatusCode(409); // a request conflict with the current state of the target resource.
            }

            return Ok(new { Message = "Employee created successfully" });
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> GetEmployee([FromQuery]int? id= null)
        {
            var _employee = await _IEmployeeRepo.GetEmployee(id);
            if (_employee == null)
            {
                return NotFound();
            }

            return Ok(_employee);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> UpdateEmployee([FromBody]EmployeeDto employee, int id)
        {
            var res = await _IEmployeeRepo.UpdateEmployee(id, employee);
            if (!res)
            {
                return BadRequest();
            }
            return Ok(new { Message = "Updated successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Employee")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var res = await _IEmployeeRepo.DeleteEmployee(id);
            if (!res)
            {
                return BadRequest();
            }
            return Ok(new { Message = "Deleted successfully" });
        }

        //[HttpGet("employees/for/teamup")]
        //public async Task<IActionResult> GetsEmployeesForTeamUp()
        //{
        //    var employees = await _IEmployeeRepo.GetEmployeesForTeamUp();
        //    return Ok(employees);
        //}
    }
}
