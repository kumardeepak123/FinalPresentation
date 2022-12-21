using CPMS.Dtos;
using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IProjectRepo
    {
        Task<bool> CreateProject(ProjectDto project, int[] TeamIds); //D
        
        Task<IEnumerable> GetProject(int? id); //D
        Task<bool> UpdateProject(int id, ProjectDto project, int[] TeamIds); //D
        Task<bool> DeleteProject(int id); //
        Task<List<ProjectWithNameAndIdDto>> GetProjectsUnderClient(int id); //
        Task<List<ProjectWithNameAndIdDto>> GetProjectsForAssignmentToClient(); //
    }  
}
