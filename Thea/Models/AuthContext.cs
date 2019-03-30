using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Thea.Models
{
    public class AuthContext : IdentityDbContext
    {
        public AuthContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "Admin".ToUpper() });
        }
        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<HomePage> HomePage { get; set; }
        public DbSet<AboutPage> AboutPage { get; set; }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<CheckeredEyesPage> CheckeredEyesPages { get; set; }
        public DbSet<Downloadables> Downloadables { get; set; }
        public DbSet<Printables> Printables { get; set; }
        public DbSet<ShopItems> ShopItems { get; set; }
        public DbSet<SocialMedia> SocialMedia{ get; set; }
        public DbSet<StorePage> StorePage { get; set; }
        public DbSet<Links> Links { get; set; }
        public DbSet<ContactInfo> ContactInfo { get; set; }
    }
   
}
