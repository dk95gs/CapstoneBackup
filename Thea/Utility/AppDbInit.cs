using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thea.Models;

namespace DKPortfolio.Utility
{
    public class AppDbInit
    {
        public static void SeedUsers(UserManager<AppUser> userManager)
        {
            if (userManager.FindByEmailAsync("info@checkeredeye.com").Result == null)
            {
                AppUser user = new AppUser
                {
                    UserName = "libby",
                    Email = "info@checkeredeye.com"
                };

                IdentityResult result = userManager.CreateAsync(user, "Password1!").Result;
                
                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }
            }
        }
    }
}
