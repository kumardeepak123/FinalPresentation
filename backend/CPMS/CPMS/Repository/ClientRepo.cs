using CPMS.DBConnect;
using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public class ClientRepo : IClientRepo
    {
        private readonly CPMDbContext cPMDbContext;
        public ClientRepo(CPMDbContext cPMDbContext)
        {
            this.cPMDbContext = cPMDbContext;
        }

        public async Task<bool> AddClient(Client client, int[] ProjectIds)
        {
            var _Client = new Client
            {

                Name = client.Name,
                Email = client.Email,
                Password = client.Password,
                Phone = client.Phone,
                Organization = client.Organization,
                AgreementPaperName = client.AgreementPaperName,
                ProfileImageName = client.ProfileImageName
            };

            cPMDbContext.Clients.Add(_Client);


            try
            {
                await cPMDbContext.SaveChangesAsync();
                foreach(var i in ProjectIds)
                {
                    cPMDbContext.Client_Projects.Add(new Client_Project
                    {
                        ClientId = _Client.Id,
                        ProjectId = i
                    });

                }
                await cPMDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }

        public async Task<Client> DeleteClient(int id)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Id == id)
            .FirstOrDefaultAsync();
            if(client == null)
            {
                return null;
            }
            cPMDbContext.Clients.Remove(client);

            var _Client_Projects = await cPMDbContext.Client_Projects.Where(x => x.ClientId == client.Id).ToListAsync();
            foreach(var r in _Client_Projects)
            {
                cPMDbContext.Client_Projects.Remove(r);
            }
           
            await cPMDbContext.SaveChangesAsync();
            return client;
        }

        public async Task<List<Client>> getAllClients(string sortBy, string orderBy, string searchByName)
        {
           var _Clients =  await cPMDbContext.Clients.ToListAsync();
           if(!string.IsNullOrEmpty(sortBy))
            {
                 switch(sortBy)
                {
                    case "name":
                        {
                            
                            _Clients = _Clients.OrderBy(c => c.Name).ToList();
                            
                            if (orderBy == "desc")
                            {
                                _Clients = _Clients.OrderByDescending(c => c.Name).ToList();
                            }

                            break;
                        }
                    case "email":
                        {
                            
                                _Clients = _Clients.OrderBy(c => c.Email).ToList();
                            
                            if (orderBy == "desc")
                            {
                                _Clients = _Clients.OrderByDescending(c => c.Email).ToList();
                            }
                            break;
                        }
                    default:
                        break;

                }
            }

            if (!string.IsNullOrEmpty(searchByName))
            {
                searchByName = searchByName.ToLower();
                _Clients = _Clients.Where(c => c.Name.ToLower().Contains(searchByName)).OrderBy(c => c.Name).ToList();
            }

            return _Clients;

        }

        public async Task<Client> getClientById(int id)
        {
            Client client = null; 
            try
            {
                client = await cPMDbContext.Clients.Where(x => x.Id == id)
                              .FirstOrDefaultAsync();
            }catch(Exception)
            {
                return null;
            }
            return  client;   
        }

        public async Task<List<Client>> getClientsUnderProject(int id)
        {
            var _ClientProjects = await cPMDbContext.Client_Projects.Where(x => x.ProjectId == id).ToListAsync();
            var res = new List<Client>();
            foreach(var e in _ClientProjects)
            {
                var client =  await cPMDbContext.Clients.Where(x => x.Id == e.ClientId).Select(c=> new Client { 
                    Id = c.Id,
                    Name = c.Name
                }).FirstOrDefaultAsync();
                res.Add(client);
            }

            return res;

        }

        public async Task<Client> SignIn(string email, string password)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
            return client;
        }

        public async Task<bool> UpdateClient(int id, Client client, int[] ProjectIds)
        {
            var dbClient = await cPMDbContext.Clients.Where(x => x.Id == id).FirstOrDefaultAsync();
            if(dbClient == null)
            {
                return false;
            }

            dbClient.Name = client.Name;
            dbClient.Email = client.Email;
            dbClient.Password = client.Password;
            dbClient.Phone = client.Phone;
            dbClient.Organization = client.Organization;
            dbClient.ProfileImageName = client.ProfileImageName;
            dbClient.AgreementPaperName = client.AgreementPaperName;
            

            var _Client_Projects = await cPMDbContext.Client_Projects.Where(x => x.ClientId == id).ToListAsync();
            foreach (var r in _Client_Projects)
            {
                cPMDbContext.Client_Projects.Remove(r);
            }

            foreach(var i in ProjectIds)
            {
                cPMDbContext.Client_Projects.Add(new Client_Project { ClientId = id, ProjectId = i });
            }

            try
            {
                
                await cPMDbContext.SaveChangesAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

            return true;
        }
    }
}
