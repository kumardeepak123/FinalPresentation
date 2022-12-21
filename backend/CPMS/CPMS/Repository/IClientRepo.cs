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
    public interface IClientRepo
    {

        
        Task<bool> AddClient(ClientDto client, int[] ProjectIds);//D
        Task<IList<Client>> getClient(int? id, string sortBy, string orderBy, string searchByName); //D
        Task<bool> UpdateClient(int id, ClientDto client, int[] ProjectIds); //D
        Task<ClientDto> DeleteClient(int id);//D
        //Task<Client> SignIn(string email, string password);

        //Task<List<Client>> getClientsUnderProject(int id);

    }
}
