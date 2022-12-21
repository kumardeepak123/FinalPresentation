using CPMS.Dtos;
using CPMS.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface ITeamRepo
    {
        Task<bool> CreateTeam(TeamDto Team, int[] EmployeeIds); //D    
        Task<IEnumerable> GetTeam(int? id); //D

        Task<bool> EditTeam(int id, TeamDto team, int[] emloyeeIds); //D
        Task<bool> DeleteTeam(int id); //D
        Task<List<TeamWithIdAndNameDto>> GetTeamsWithNoProject(); //D
        

    }
}
