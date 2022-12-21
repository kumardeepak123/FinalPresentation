using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public class ClientRepo : IClientRepo
    {
        private readonly CPMDbContext cPMDbContext;
        private readonly IMapper _IMapper;
        public ClientRepo(CPMDbContext cPMDbContext, IMapper mapper)
        {
            this.cPMDbContext = cPMDbContext;
            _IMapper = mapper;
        }

        public async Task<bool> AddClient(ClientDto client, int[] ProjectIds)
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

        public async Task<ClientDto> DeleteClient(int id)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Id == id)
            .FirstOrDefaultAsync();
            if(client == null)
            {
                return null;
            }
            

            var _Client_Projectss = await cPMDbContext.Client_Projects.Where(x => x.ClientId == id).ToListAsync();
            cPMDbContext.Clients.Remove(client);
            foreach (var r in _Client_Projectss)
            {
                var projects = await cPMDbContext.Projects.Where(e => e.Id == r.ProjectId).ToListAsync();
                //cPMDbContext.Client_Projects.Remove(r);
                foreach(var p in projects)
                {
                    var teams = await cPMDbContext.Teams.Where(t => t.ProjectId == p.Id).ToListAsync();
                    foreach (var td in teams)
                    {
                        cPMDbContext.Teams.Remove(td);
                    }
                    cPMDbContext.Projects.Remove(p);
                }
                             
            }
           
            await cPMDbContext.SaveChangesAsync();
            return _IMapper.Map<ClientDto>(client);
        }

        public async Task<IList<Client>> getClient(int? id, string sortBy, string orderBy, string searchByName)
        {
            if(id !=null)
            {
                
                try
                {
                    var client = await cPMDbContext.Clients.Where(x => x.Id == id)
                                  .ToListAsync();
                    if (client == null || client.Count == 0) return null;
                    return client;
                }
                catch (Exception)
                {
                    return null;
                }
                
            }
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


        //public async Task<Client> SignIn(string email, string password)
        //{
        //    var client = await cPMDbContext.Clients.Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
        //    return client;
        //}

        public async Task<bool> UpdateClient(int id, ClientDto client, int[] ProjectIds)
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

            cPMDbContext.Clients.Update(dbClient);

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
