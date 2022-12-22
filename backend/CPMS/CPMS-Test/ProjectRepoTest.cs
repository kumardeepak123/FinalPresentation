using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using CPMS.Models;
using CPMS.Repository;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
   public class ProjectRepoTest
{
        private static DbContextOptions<CPMDbContext> dbContextOptions = new DbContextOptionsBuilder<CPMDbContext>()
               .UseInMemoryDatabase(databaseName: "CPMSProjectTest")
               .Options;

        CPMDbContext context;
        ProjectRepo _ProjectRepo;
        IMapper mapper;
        [OneTimeSetUp]
        public void Setup()
        {

            context = new CPMDbContext(dbContextOptions);
            context.Database.EnsureCreated();
            SeedDatabase();
            _ProjectRepo = new ProjectRepo(context, mapper);
        }



        [Test, Order(1)]
        public async Task DeleteProject_WithResponse_Test()
        {

            var res = await _ProjectRepo.DeleteProject(3);
            Assert.That(res, Is.True);
        }
        [Test, Order(2)]
        public async Task DeleteProject_WithOutResponse_Test()
        {

            var res = await _ProjectRepo.DeleteProject(456);
            Assert.That(res, Is.False);
        }
        [Test, Order(3)]
        public async Task GetAllProjects_WithResponse_Test()
        {

            var res = (IList)await _ProjectRepo.GetProject(null);
            Assert.That(res, Is.Not.Empty);
            Assert.That(res.Count, Is.EqualTo(4));
        }
        [Test, Order(4)]
        public async Task GetProjectById_WithResponse_Test()
        {

            var res = (IList)await _ProjectRepo.GetProject(3);
            Assert.That(res, Is.Not.Null);
            Assert.That(res.Count, Is.EqualTo(1));
            
        }
       

        [Test, Order(5)]
        public async Task UpdateProjects_WithResponse_Test()
        {
            var _Project = new ProjectDto
            {
                
                Name = "Employee Management",
                StartDate = System.DateTime.Today.AddDays(2),
                EndDate = System.DateTime.Today.AddDays(10),
                Technology = "MEAN",
                FRequirement = "F.R.2",
                NFRequirement = "N.F.R.2",
                Budget = 5000,

            };
            var TeamIds = new int[] { 1, 2 };
            var res = await _ProjectRepo.UpdateProject(2, _Project, TeamIds);
            Assert.That(res, Is.True);


        }
        [Test, Order(6)]
        public async Task UpdateProjects_WithoutResponse_Test()
        {
            var _Project = new ProjectDto
            {
                
                Name = "Employee Management",
                StartDate = System.DateTime.Today.AddDays(2),
                EndDate = System.DateTime.Today.AddDays(10),
                Technology = "MEAN",
                FRequirement = "F.R.2",
                NFRequirement = "N.F.R.2",
                Budget = 5000,

            };
            var TeamIds = new int[] { 1, 2 };
            var res = await _ProjectRepo.UpdateProject(245, _Project, TeamIds);
            Assert.That(res, Is.False);


        }

        [OneTimeTearDown]
        public void Cleanup()
        {
            context.Database.EnsureDeleted();
        }

        private void SeedDatabase()
        {
            var _Clients = new List<Client>()
            {
                new Client
                {
                    Id = 1,
                    Name ="Deepak",
                    Email="deepak@gmail.com",
                    Password="deepak123",
                    Phone="9668855719",
                    Organization="hexaware",
                    ProfileImageName="profile1.png",
                    AgreementPaperName="agree1.pdf"
                },
                 new Client
                {
                    Id = 2,
                    Name ="Alisha",
                    Email="alisha@gmail.com",
                    Password="alisha123",
                    Phone="5268956235",
                    Organization="hexaware",
                    ProfileImageName="profile2.png",
                    AgreementPaperName="agree2.pdf"
                },
                  new Client
                {
                    Id = 3,
                    Name ="Aman",
                    Email="aman@gmail.com",
                    Password="aman123",
                    Phone="5623895623",
                    Organization="hexaware",
                    ProfileImageName="profile3.png",
                    AgreementPaperName="agree3.pdf"

                }
            };

            var _Projects = new List<Project>()
            {
                new Project
                {
                    Id =1,
                    Name="Library Management System",
                    StartDate= System.DateTime.Today,
                    EndDate = System.DateTime.Today.AddDays(2),
                    Technology= "MERN",
                    FRequirement="F.R.1",
                    NFRequirement="N.F.R.1",
                    Budget= 1000

                },
                 new Project
                {
                    Id =2,
                    Name="Employee Management System",
                    StartDate= System.DateTime.Today.AddDays(2),
                    EndDate = System.DateTime.Today.AddDays(10),
                    Technology= "MEAN",
                    FRequirement="F.R.2",
                    NFRequirement="N.F.R.2",
                    Budget= 5000

                },
                  new Project
                {
                    Id =3,
                    Name="Parking Managemet System",
                    StartDate= System.DateTime.Today.AddDays(3),
                    EndDate = System.DateTime.Today.AddDays(10),
                    Technology= "LAMP",
                    FRequirement="F.R.3",
                    NFRequirement="N.F.R.3",
                    Budget= 2000

                },
                 new Project
                {
                    Id =4,
                    Name="Airline Management System",
                    StartDate= System.DateTime.Today.AddDays(2),
                    EndDate = System.DateTime.Today.AddDays(9),
                    Technology= "MERN",
                    FRequirement="F.R.4",
                    NFRequirement="N.F.R.4",
                    Budget= 5000

                }

            };

            var Client_Projects = new List<Client_Project>
            {
                new Client_Project{Id =1, ClientId=1, ProjectId=1},
                new Client_Project{Id=2, ClientId=1, ProjectId=2},
                new Client_Project{Id=3, ClientId=2, ProjectId=3}
            };

            var Teams = new List<Team>
            {
                new Team{Id =1, Name= "Team-1"},
                new Team{Id=2, Name="Team-2"},
                new Team{Id=3,Name="Team-3"}
            };

            var Employees = new List<Employee>
            {
                new Employee
                {
                    Id =1,
                    Name="Deepak",
                    Email="deepak@gmail.com",
                    Password="12345",
                    Phone="9769898989",
                    Designation="Frontend Developer",
                    Role= "Employee"
                   
                },
                new Employee
                {
                    Id =2,
                    Name="Sahoo",
                    Email="saho@gmail.com",
                    Password="12345",
                    Phone="4569898989",
                    Designation="Backend Developer",
                    Role= "Employee"
                },
                 new Employee
                {
                    Id =3,
                    Name="Yogesh",
                    Email="yogesh@gmail.com",
                    Password="12345",
                    Phone="4569898952",
                    Designation="Tester",
                    Role= "Employee"
                }
            };
            var team_employees = new List<Team_Employee>
            {
                new Team_Employee{Id=1, TeamId=1, EmployeeId=1},
                new Team_Employee{Id=2, TeamId=1, EmployeeId=2},
                new Team_Employee{Id=3, TeamId=2, EmployeeId=2},
                new Team_Employee{Id=4, TeamId=2, EmployeeId=3},
            };

            context.Clients.AddRange(_Clients);
            context.Projects.AddRange(_Projects);
            context.Client_Projects.AddRange(Client_Projects);
            context.Employees.AddRange(Employees);
            context.Teams.AddRange(Teams);
            context.Team_Employees.AddRange(team_employees);
            context.SaveChanges();

        }
    }
}
