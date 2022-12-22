using AutoMapper;
using CPMS.Dtos;
using CPMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.MappingConfigurations
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Client, UserDto>();
            CreateMap<Employee, UserDto>();
        }
    }
}
