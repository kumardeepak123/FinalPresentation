using AutoMapper;
using CPMS.Dtos;
using CPMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.MappingConfigurations
{
    public class TeamProfile : Profile
    {
        public TeamProfile()
        {
            CreateMap<Team, TeamDto>().ReverseMap();
            CreateMap<Team, TeamWithIdAndNameDto>();
        }
    }
}
