using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CPMS.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepo _IAuthRepo;

        public AuthController(IAuthRepo _IAuthRepo)
        {
            this._IAuthRepo = _IAuthRepo;
        }

        [HttpGet("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> Signin(string email, string password, string role)
        {
            var user = await _IAuthRepo.SignIn(email, password, role);
            if (user == null) return NotFound();
            return Ok(user);
        }
    }
}