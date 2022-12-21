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
    public class TeamRepo : ITeamRepo
    {
        public readonly CPMDbContext _CPMDbContext;
        private readonly IMapper _IMapper;

        public TeamRepo(CPMDbContext cPMDbContext, IMapper mapper)
        {
            _CPMDbContext = cPMDbContext;
            _IMapper = mapper;
        }

        public async Task<bool> CreateTeam(TeamDto team, int[] EmployeeIds)
        {
            var _Team = _IMapper.Map<Team>(team);
            _CPMDbContext.Teams.Add(_Team);
            try
            {
                

                await _CPMDbContext.SaveChangesAsync();
                foreach (var eid in EmployeeIds)
                {
                    var team_employee_record = new Team_Employee
                    {
                        TeamId = _Team.Id,
                        EmployeeId = eid
                    };

                    _CPMDbContext.Team_Employees.Add(team_employee_record);
                    await _CPMDbContext.SaveChangesAsync();

                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;

        }

        public async Task<bool> DeleteTeam(int id)
        {
            var _Team = await _CPMDbContext.Teams.Where(t => t.Id == id).FirstOrDefaultAsync();
            if (_Team == null) return false;

            try
            {
                _CPMDbContext.Teams.Remove(_Team);
                await _CPMDbContext.SaveChangesAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }

            return true;
        }

        public async Task<bool> EditTeam(int id, TeamDto team, int[] employeeIds)
        {
            var _Team = await _CPMDbContext.Teams.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (_Team == null) return false;

            _Team.Name = team.Name;
            var _Employees_belong_teams = await _CPMDbContext.Team_Employees.Where(x => x.TeamId == id).ToListAsync();
            foreach (var e in _Employees_belong_teams)
            {

                _CPMDbContext.Team_Employees.Remove(e);
            }

            foreach (var eid in employeeIds)
            {
                var team_employee_record = new Team_Employee
                {
                    TeamId = id,
                    EmployeeId = eid
                };

                _CPMDbContext.Team_Employees.Add(team_employee_record); 

            }

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

        public async Task<IEnumerable> GetTeam(int? id)
        {
           if(id != null)
            {
                var team = await _CPMDbContext.Teams.Where(x => x.Id == id).Select(x=> new {
                    
                    Name= x.Name,
                    Employees= x._Team_Employees.Select(p=> new  {
                        Name = p._Employee.Name,
                        Email = p._Employee.Email,
                        Phone =p._Employee.Phone,
                        Designation= p._Employee.Designation
                    }).ToList()
                }).ToListAsync();
                if (team == null || team.Count == 0) return null;
                return team;
            }
            else
            {
                var teams = await _CPMDbContext.Teams.Select(x => new {

                    Name = x.Name,
                    Employees = x._Team_Employees.Select(p => new 
                    {
                        Name = p._Employee.Name,
                        Email = p._Employee.Email,
                        Phone = p._Employee.Phone,
                        Designation = p._Employee.Designation
                    }).ToList()
                }).ToListAsync();

                return teams;
            }
        }

       

      

        public async Task<List<TeamWithIdAndNameDto>> GetTeamsWithNoProject()
        {
            var _Teams = await _CPMDbContext.Teams.Where(t => t.ProjectId == null).Select(x => new TeamWithIdAndNameDto
            {
                Id = x.Id,
                Name = x.Name
                
            }).ToListAsync();
            return _Teams;
        }

    }
}
