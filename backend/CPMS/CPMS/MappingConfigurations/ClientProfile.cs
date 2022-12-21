using AutoMapper;
using CPMS.Dtos;
using CPMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.MappingConfigurations
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<Client, ClientWithIdAndName>();
        }
    }
}
