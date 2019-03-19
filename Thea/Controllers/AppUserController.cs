using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Thea.Models;

namespace Thea.Controllers
{
    public class LoginInput
    {
        public string  UserName { get; set; }

        public string Password { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private IConfiguration _config;
        public AppUserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<Object> RegisterUser(UserRegistrationInputModel input)
        {
            bool start = true;
            string test = "";
            var appUser = new AppUser()
            {
                UserName = input.UserName,
                Email = input.Email,
                FullName = input.FullName
            };

            try
            {
                var result = await _userManager.CreateAsync(appUser, input.Password);
                return Ok(result);
                
            }
            catch (Exception ex)
            {

                throw ex.InnerException;
            }
        }
        [HttpPost]
        [Route("Login")]
        public async Task<Object> Login(LoginInput input)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(input.UserName, input.Password, false, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    var claimsData = new[] { new Claim(ClaimTypes.Name, input.UserName) };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("MyKey").Value));
                    SigningCredentials signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
                    var token = new JwtSecurityToken(
                        issuer: "my.site.com",
                        audience: "my.site.com",
                        expires: DateTime.Now.AddHours(1),
                        claims: claimsData,
                        signingCredentials: signInCred
                        );
                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(tokenString);                    
                }
                else
                {
                    return NotFound("Failed");
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [HttpPost]
        [Route("Logout")]
        public async Task<object> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Signed out successfully");
        }
    }
}