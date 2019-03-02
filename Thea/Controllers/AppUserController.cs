using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public UserManager<AppUser> _userManager;
        public SignInManager<AppUser> _signInManager;

        public AppUserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                    return Ok("Successfully Logged in");
                    
                }
                else
                {
                    return NotFound("Login Failed");
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