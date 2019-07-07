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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class StorePageController : ControllerBase
    {
        private readonly AuthContext _db;

        public StorePageController(AuthContext db)
        {
            _db = db;
        }
        [HttpGet]
        public object GetContent()
        {

            var rec = _db.StorePage.FirstOrDefault();

            return rec;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<object> Update(StorePage sp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var rec = _db.StorePage.Find(sp.Id);

            if (rec == null)
            {
                StorePage newStore = new StorePage
                {
                    Heading = sp.Heading,
                    Description = sp.Description,
                    PurchaseInfo = sp.PurchaseInfo,
                    PurchaseInfoHeading = sp.PurchaseInfoHeading
                };
                _db.Add(newStore);
            }
            else
            {
                rec.Heading = sp.Heading;
                rec.Description = sp.Description;
                rec.PurchaseInfo = sp.PurchaseInfo;
                rec.PurchaseInfoHeading = sp.PurchaseInfoHeading;
                rec.LocationList = sp.LocationList;
            }
            await _db.SaveChangesAsync();
            return Ok("200");
        }
    }
}