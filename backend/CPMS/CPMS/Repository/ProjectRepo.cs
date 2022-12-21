﻿using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using CPMS.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public class ProjectRepo : IProjectRepo
    {
        private readonly CPMDbContext cPMDbContext;
        private readonly IMapper _IMapper;

        public ProjectRepo(CPMDbContext cPMDbContext, IMapper mapper)
        {
            this.cPMDbContext = cPMDbContext;
            _IMapper = mapper;
        }

        
        public async Task<bool> CreateProject(ProjectDto project, int[] TeamIds)
        {

            var _Project = _IMapper.Map<Project>(project);
            _Project.Status = "Active";
            cPMDbContext.Projects.Add(_Project);

            try
            {
                await cPMDbContext.SaveChangesAsync();

                foreach (var tid in TeamIds)
                {
                    var _Team = await cPMDbContext.Teams.Where(x => x.Id == tid).FirstOrDefaultAsync();
                    _Team.ProjectId = _Project.Id;
                    await cPMDbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
            return true;
        }

       
        public async Task<bool> DeleteProject(int id)
        {
            //var project = await cPMDbContext.Projects.Where(x => x.Id == id).FirstOrDefaultAsync();
            //if (project == null) return false;

            //var _Teams = await cPMDbContext.Teams.Where(x => x.ProjectId == id).ToListAsync();
            //if(_Teams != null && _Teams.Count >= 1)
            //{
            //    foreach(var t in _Teams)
            //    {
            //        t.ProjectId = null;

            //    }
            //}

            //var _client_projects = await cPMDbContext.Client_Projects.Where(x => x.ProjectId == id).ToListAsync();
            //if(_client_projects!= null && _client_projects.Count >= 1)
            //{
            //    foreach(var r in _client_projects)
            //    {
            //        cPMDbContext.Client_Projects.Remove(r);
            //    }
            //}
            //cPMDbContext.Projects.Remove(project);

            //await cPMDbContext.SaveChangesAsync();
            return true;
        }
       
        public async Task<IEnumerable> GetProject(int? id)
        {
            if(id !=null)
            {
                var project = await cPMDbContext.Projects.Where(p => p.Id == id).Select(x => new Project
                {

                    Name = x.Name,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    Budget = x.Budget,
                    FRequirement = x.FRequirement,
                    NFRequirement = x.NFRequirement,
                    Technology = x.Technology,
                    Status = x.Status,
                    Teams = x.Teams.Select(t => new Team
                    {
                        Id = t.Id,
                        Name = t.Name

                    }).ToList(),

                }).ToListAsync();
                if (project == null) return null;
                return _IMapper.Map<IList<ProjectDto>>(project);
            }
            else
            {
                var projects = await cPMDbContext.Projects.Select(x=> new ProjectWithNameAndIdDto {
                    Id = x.Id,
                    Name = x.Name
                }).ToListAsync();

                return projects;
            }
            

            
        }

        
        public async Task<List<ProjectWithNameAndIdDto>> GetProjectsUnderClient(int id)
        {

            //var _Client = await cPMDbContext.Clients.Where(x => x.Id == id).Select(x=> new Client { 
            //    Id = x.Id,
            //    Client_Projects= x.Client_Projects
            //}).FirstOrDefaultAsync();
            //List<Project> _Projects = new List<Project>();
            //foreach(var e in _Client.Client_Projects)
            //{
            //    var _Project = await cPMDbContext.Projects.Where(x => x.Id == e.ProjectId).Select(x=> new Project { 
            //        Id = x.Id,
            //        Name= x.Name,
            //        FRequirement = x.FRequirement,
            //        NFRequirement= x.NFRequirement,
            //        Budget =x.Budget,
            //        StartDate =x.StartDate,
            //        EndDate =x.EndDate,
            //        Technology =x.Technology,
            //        Status = x.Status
            //    }).FirstOrDefaultAsync();
            //    _Projects.Add(_Project);
            //}

            //return _Projects;
            return null;
        }

        
        public async Task<List<ProjectWithNameAndIdDto>> GetProjectsForAssignmentToClient()
        {
            //var projects = await cPMDbContext.Projects.Select(x=> new Project { 
            //    Id= x.Id,
            //    Name= x.Name,
            //    FRequirement=x.FRequirement,
            //    NFRequirement= x.NFRequirement,
            //    Budget= x.Budget,
            //    Technology =x.Technology,
            //    Status =x.Status
            //}).ToListAsync();

            //HashSet<int> _ProjectIds = new HashSet<int>();
            //var _ClientProjects = await cPMDbContext.Client_Projects.ToListAsync();

            //foreach(var e in _ClientProjects)
            //{

            //        _ProjectIds.Add((int)e.ProjectId);

            //}
            //if(_ProjectIds.Count == 0)
            //{
            //    return projects;
            //}


            //return await cPMDbContext.Projects.Where(x => _ProjectIds.Contains(x.Id) == false).Select(x => new Project
            //{
            //    Id = x.Id,
            //    Name = x.Name,
            //    FRequirement = x.FRequirement,
            //    NFRequirement = x.NFRequirement,
            //    Budget = x.Budget,
            //    Technology = x.Technology,
            //    Status = x.Status
            //}).ToListAsync();

            return null;
        }

        
        public async Task<bool> UpdateProject(int id, ProjectDto project, int[] TeamIds)
        {
            var proj = await cPMDbContext.Projects.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (proj == null) return false;

            proj.Name = project.Name;
            proj.Budget = project.Budget;
            proj.StartDate = project.StartDate;
            proj.EndDate = project.EndDate;
            proj.Status = project.Status;
            proj.FRequirement = project.FRequirement;
            proj.NFRequirement = project.NFRequirement;
            proj.Technology = project.Technology;

            cPMDbContext.Projects.Update(proj);

            if (proj.Status == "Completed" || proj.Status == "Cancelled")
            {
                var _TeamsInfo = await cPMDbContext.Teams.Where(t => t.ProjectId == id).ToListAsync();
                foreach (var t in _TeamsInfo)
                {
                    
                    cPMDbContext.Teams.Remove(t);
                }
               await  cPMDbContext.SaveChangesAsync();

              return true;
            }


            
            var _Teams = await cPMDbContext.Teams.Where(t => t.ProjectId == id).ToListAsync();
            foreach (var t in _Teams)
            {
                t.ProjectId = null;
            }
            foreach (var i in TeamIds)
            {
                var team = await cPMDbContext.Teams.Where(t => t.Id == i).FirstOrDefaultAsync();
                team.ProjectId = id;
            }
            try
            {
                await cPMDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Console.WriteLine(ex);
                return false;
            }

            return true;
        }

        
    }

    
}