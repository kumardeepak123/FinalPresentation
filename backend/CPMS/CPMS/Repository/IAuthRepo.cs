using CPMS.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IAuthRepo
    {
         Task<UserDto> SignIn(string email, string password, string Role);
         string GenerateToken(UserDto userDto);
    }
}
