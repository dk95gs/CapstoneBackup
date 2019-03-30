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
        [Route("Login")]
        public async Task<IActionResult> Login(LoginInput input)
        {
            var user = await _userManager.FindByNameAsync(input.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, input.Password))
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }; 
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("wsX3nxjFzwQRN4zfJ6fmpz0dkX00S5zp"));
                var token = new JwtSecurityToken(
                    issuer: "https://www.checkeredeye.com/",
                    audience: "https://www.checkeredeye.com/",
                    expires: DateTime.UtcNow.AddHours(2),
                    claims: claims,
                    signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
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