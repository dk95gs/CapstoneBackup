using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Thea.Models;

namespace Thea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactInfoController : ControllerBase
    {
        private readonly AuthContext _db;
        public ContactInfoController(AuthContext db)
        {
            _db = db;
        }

        [HttpGet]
        public object GetContext()
        {
            var rec = _db.ContactInfo.FirstOrDefault();

            return rec;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<object> Update(ContactInfo ci)
        {
            var rec = _db.ContactInfo.FirstOrDefault();
            string message;
            if(rec == null)
            {
                ContactInfo tempCI = new ContactInfo
                {
                    Id = ci.Id,
                    StreetName = ci.StreetName,
                    City = ci.City,
                    Province = ci.Province,
                    Country = ci.Country,
                    PostalCode = ci.PostalCode,
                    LocalNumber = ci.LocalNumber,
                    TollFreeNumber = ci.TollFreeNumber,
                    Email = ci.Email,
                    FooterMessage = ci.FooterMessage,
                    HeaderHeading = ci.HeaderHeading,
                    HeaderSubHeading = ci.HeaderSubHeading
                };
                _db.Add(tempCI);
                message = "Added New Rec";
            } else
            {
                rec.StreetName = ci.StreetName;
                rec.Province = ci.Province;
                rec.City = ci.City;
                rec.Country = ci.Country;
                rec.LocalNumber = ci.LocalNumber;
                rec.TollFreeNumber = ci.TollFreeNumber;
                rec.Email = ci.Email;
                rec.FooterMessage = ci.FooterMessage;
                rec.HeaderHeading = ci.HeaderHeading;
                rec.HeaderSubHeading = ci.HeaderSubHeading; 
                message = "Updated record";
            }
            await _db.SaveChangesAsync();
            
            return Ok(message);
        }
    }
}