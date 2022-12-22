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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepo _IProjectRepo;
        private readonly IClientRepo _IClientRepo;
        public ProjectController(IProjectRepo iProjectRepo, IClientRepo iClientRepo)
        {
            _IProjectRepo = iProjectRepo;
            _IClientRepo = iClientRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectDto project, string TeamIds)
        {
            int[] _TeamIds = TeamIds.Trim().Split(",").Select(e => Convert.ToInt32(e)).ToArray();
            var res = await _IProjectRepo.CreateProject(project, _TeamIds);
            if (!res)
            {
                return Ok(new { message = "Failed to create Project" });
            }

            return Ok(new { message = "Project created successfully" });
        }

        [HttpGet]
        //[Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetProject([FromQuery]int? id)
        {
            var project = await _IProjectRepo.GetProject(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }



        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> UpdateProject(int id, ProjectDto project, string TeamIds)
        {
            int[] _TeamIds = TeamIds.Trim().Split(",").Select(e => Convert.ToInt32(e)).ToArray();
            var res = await _IProjectRepo.UpdateProject(id, project, _TeamIds);
            if (!res)
            {
                return BadRequest();
            }

            return Ok(new { message = "Updated successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var res = await _IProjectRepo.DeleteProject(id);
            if (!res)
            {
                return NotFound();
            }
            return Ok(new { Message = "Deleted successfully" });
        }


        [HttpGet("under/client/{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<ActionResult<IEnumerable<ProjectWithNameAndIdDto>>> GetProjectsUnderClient(int id)
        {
            var projects = await _IProjectRepo.GetProjectsUnderClient(id);
            if (projects == null || projects.Count == 0)
            {
                return NotFound();
            }

            return Ok(projects);
        }

        [HttpGet("projects/for/assignment")]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsForAssignmentToClient()
        {
            var projects = await _IProjectRepo.GetProjectsForAssignmentToClient();
            if (projects == null )
            {
                return NotFound();
            }

            return Ok(projects);
        }

        /* [HttpPut("update/clientIds/{id}")]
         [Authorize(Roles = "Admin")]
         public async Task<IActionResult> UpdateClientIds(int id)
         {
             var projects = await _IProjectRepo.GetAllProjects();
             if (projects == null)
             {
                 return NotFound();
             }

             *//*foreach (var p in projects)
             {
                 if (p.ClientId == id)
                 {
                     p.ClientId = null;
                     var res = await _IProjectRepo.UpdateProject(p.Id, p);
                 }


             }*//*

             return Ok(new { message = "All Client Ids updated" });
         }*/

        /*  [HttpGet("demo")]
          public async Task<IActionResult> ProjectNameWithClientName(int id)
          {
              var res = await _IProjectRepo.ProjectName_WithClientName(id);
              return Ok(res);
          }*//*

      }*/


    }
}
