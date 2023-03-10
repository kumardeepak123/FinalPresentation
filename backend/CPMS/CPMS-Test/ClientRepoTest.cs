using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using CPMS.Models;
using CPMS.Repository;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tests
{
    public class ClientRepoTest
    {
        private static DbContextOptions<CPMDbContext> dbContextOptions = new DbContextOptionsBuilder<CPMDbContext>()
               .UseInMemoryDatabase(databaseName: "CPMSTest")
               .Options;

        CPMDbContext context;
        ClientRepo _ClientRepo;
        IMapper _IMapper;

        [OneTimeSetUp]
        public void Setup()
        {

            context = new CPMDbContext(dbContextOptions);
            context.Database.EnsureCreated();
            SeedDatabase();
            _ClientRepo = new ClientRepo(context, _IMapper);
        }

        [Test, Order(1)]
        public async Task GetAllClients_WithNoFilter_Test()
        {
            var res = await _ClientRepo.getClient(null,"", "", "");
            Assert.That(res.Count, Is.EqualTo(3));
        }

        [Test, Order(2)]
        public async Task GetAllClients_WithSearchBy_Test()
        {
            var res = await _ClientRepo.getClient(null,"", "", "Ali");
            Assert.That(res.First().Name, Is.EqualTo("Alisha"));
        }

        [Test, Order(3)]
        public async Task GetClientById_WithResponse_Test()
        {
            var res = await _ClientRepo.getClient(3,"","","");
            Assert.That(res, Is.Not.Null);
            Assert.That(res.First().Name, Is.EqualTo("Aman"));

        }
        [Test, Order(4)]
        public async Task GetClientById_WithoutResponse_Test()
        {
            var res = await _ClientRepo.getClient(899,"","","");
            Assert.That(res, Is.Null);


        }




        
       
        [Test, Order(6)]
        public async Task DeleteClient_WithoutResponse_Test()
        {
            var res = await _ClientRepo.DeleteClient(388);
            Assert.That(res, Is.Null);

        }

        [Test, Order(7)]
        public async Task UpdateClient_WithResponse_Test()
        {
            var client = new ClientDto
            {
                
                Name = "Deepak Kumar Sahoo",
                Email = "deepak@gmail.com",
                Password = "deepak123",
                Phone = "9668855719",
                Organization = "hexaware",
                ProfileImageName = "profile1.png",
                AgreementPaperName = "agree1.pdf"

            };
            var ProjectIds = new int[] { 1, 2 };

            var res = await _ClientRepo.UpdateClient(1, client, ProjectIds);
            Assert.That(res, Is.True);

        }

        [Test, Order(8)]
        public async Task UpdateClient_WithoutResponse_Test()
        {
            var client = new ClientDto
            {
               
                Name = "Deepak Kumar Sahoo",
                Email = "deepak@gmail.com",
                Password = "deepak123",
                Phone = "9668855719",
                Organization = "hexaware",
                ProfileImageName = "profile1.png",
                AgreementPaperName = "agree1.pdf"

            };
            var ProjectIds = new int[] { 1, 2 };
            var res = await _ClientRepo.UpdateClient(856, client, ProjectIds);
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