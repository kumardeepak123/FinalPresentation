using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CPMS.DBConnect;
using CPMS.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CPMS.Repository
{

    public class AuthRepo : IAuthRepo
    {
        private readonly CPMDbContext cPMDbContext;
        private readonly IMapper _IMapper;
        private IConfiguration _config;
        public AuthRepo(CPMDbContext cpmDbContext, IMapper mapper, IConfiguration config)
        {
            cPMDbContext = cpmDbContext;
            _IMapper = mapper;
            _config = config;
        }

       

        public async Task<UserDto> SignIn(string email, string password, string Role)
        {
            UserDto userDto = null;
            if(Role == "Client")
            {
                var client = await cPMDbContext.Clients.Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
                if(client == null)return null;
                userDto = _IMapper.Map<UserDto>(client);
                userDto.Role = "Client";

            }
            else if(Role == "Employee")
            {
                var emp = await cPMDbContext.Employees.Where(x => x.Email == email && x.Password == password && x.Role=="Employee").FirstOrDefaultAsync();
                if (emp == null) return null;
                userDto = _IMapper.Map<UserDto>(emp);
                userDto.Role = "Employee";
            }
            else if(Role == "Admin")
            {
                var admin = await cPMDbContext.Employees.Where(x => x.Email == email && x.Password == password && x.Role == "Admin").FirstOrDefaultAsync();
                if (admin == null) return null;
                userDto = _IMapper.Map<UserDto>(admin);
                userDto.Role = "Admin";
            }

            userDto.Token = GenerateToken(userDto);
            return userDto;

        }

        public string GenerateToken(UserDto user)
        {
          
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                 new Claim(ClaimTypes.NameIdentifier, user.Name),
                 new Claim(ClaimTypes.Email, user.Email),
                 new Claim(ClaimTypes.Role,user.Role)
                };

                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                  _config["Jwt:Audience"],
                  claims,
                  expires: DateTime.Now.AddMinutes(15),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            
        }
    }
}
