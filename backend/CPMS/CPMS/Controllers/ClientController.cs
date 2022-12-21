using CPMS.Dtos;
using CPMS.Models;
using CPMS.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CPMS.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepo _IClientRepo;
        private readonly IHostingEnvironment _hostEnvironment;
        private IConfiguration _config;

        

        public ClientController(IClientRepo iClientRepo, IHostingEnvironment hostEnvironment, IConfiguration config)
        {
            _IClientRepo = iClientRepo;
            this._hostEnvironment = hostEnvironment;
            _config = config;
        }



        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateClient([FromForm] ClientDto client, string ProjectIds)
        {
            int[] _ProjectIds = ProjectIds.Trim().Split(",").Select(i => Convert.ToInt32(i)).ToArray();

            string FileExtension = Path.GetExtension(client.AgreementPaperFile.FileName);
            if (FileExtension != ".pdf")
            {
                return BadRequest(new { message = "Please select pdf files" });
            }
            client.ProfileImageName = await SaveFile(client.ProfileImageFile);
            client.AgreementPaperName = await SaveFile(client.AgreementPaperFile);

            var res = await _IClientRepo.AddClient(client, _ProjectIds);
            if (res)
            {
                return Ok(new { message = "Client created successfully" });
            }

            return StatusCode(501);
        }

        [HttpGet]   
        //[Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetClient(string sortBy, string orderBy, string searchByName, [FromQuery]int? id = null)
        {
            var client = await _IClientRepo.getClient(id,sortBy, orderBy, searchByName);
            if (client == null)
            {
                return NotFound();
            }
            if(id != null)
            {
                foreach(var e in client)
                {
                    e.ProfileImageSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, e.ProfileImageName);
                    e.AgreementPaperSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, e.AgreementPaperName);
                }

                
            }

            return Ok(client);
            

        }



        //[HttpGet("clients-working-project/{id}")]
        ////[Authorize(Roles = "Admin")]
        //public async Task<ActionResult<List<Client>>> getClientsUnderProject(int id)
        //{
        //    var clients = await _IClientRepo.getClientsUnderProject(id);
        //    return Ok(clients);
        //}

        //[AllowAnonymous]
        //[HttpPost("signin")]
        //public async Task<IActionResult> SignIn(string email, string password)
        //{
        //    var user = await Authenticate(email, password);
        //    if (user != null)
        //    {
        //        var token = Generate(user);
        //        return Ok(new
        //        {
        //            message = "SignIn successfull",
        //            UserId = user.Id,
        //            Role = "Client",
        //            Token = token
        //        });
        //    }

        //    return NotFound(new { message = "User Not Found" });
        //}

        //[NonAction]
        //private string Generate(Client user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //         new Claim(ClaimTypes.NameIdentifier, user.Name),
        //         new Claim(ClaimTypes.Email, user.Email),
        //         new Claim(ClaimTypes.Role, "Client")
        //     };

        //    var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        //      _config["Jwt:Audience"],
        //      claims,
        //      expires: DateTime.Now.AddMinutes(15),
        //      signingCredentials: credentials);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        //[NonAction]
        //private async Task<Client> Authenticate(string email, string password)
        //{
        //    var client = await _IClientRepo.SignIn(email, password);
        //    return client;
        //}

        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> UpdateClient(int id, [FromForm] ClientDto client, string ProjectIds)
        {
            int[] _ProjectIds = ProjectIds.Trim().Split(",").Select(i => Convert.ToInt32(i)).ToArray();
            if (client.ProfileImageFile != null)
            {
                DeleteFile(client.ProfileImageName);
                client.ProfileImageName = await SaveFile(client.ProfileImageFile);
            }

            if (client.AgreementPaperFile != null)
            {
                DeleteFile(client.AgreementPaperName);
                client.AgreementPaperName = await SaveFile(client.AgreementPaperFile);
            }
            var res = await _IClientRepo.UpdateClient(id, client, _ProjectIds);
            if (!res)
            {
                return BadRequest();
            }

            return Ok(new { message = "Update successfull" });
        }

        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _IClientRepo.DeleteClient(id);
            if (client == null)
            {
                return NotFound();
            }
            DeleteFile(client.AgreementPaperName);
            DeleteFile(client.ProfileImageName);
            
            return Ok(new { message = "Deleted successfully" });

        }


        [NonAction]
        public async Task<string> SaveFile(IFormFile file)
        {
            string fileName = new String(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(' ', '-');
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "UploadFiles", fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return fileName;
        }

        [NonAction]
        public void DeleteFile(string fileName)
        {
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "UploadFiles", fileName);
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }



    }

}
