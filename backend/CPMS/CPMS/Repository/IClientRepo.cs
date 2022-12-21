using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IClientRepo
    {

        Task<Client> getClientById(int id);//DONE
        Task<List<Client>> getAllClients(string sortBy, string orderBy, string searchByName); //DONE
        Task<bool> AddClient(Client client, int[] ProjectIds);//DONE
        Task<bool> UpdateClient(int id, Client client, int[] ProjectIds); //DONE
        Task<Client> DeleteClient(int id);//DONE
        Task<Client> SignIn(string email, string password);

        Task<List<Client>> getClientsUnderProject(int id);

    }
}
