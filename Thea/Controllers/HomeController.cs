using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Thea.Models;

namespace Thea.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly AuthContext _db;

        public HomeController(AuthContext db)
        {
            _db = db;
        }
        [HttpGet]
        public object GetContent()
        {
            var rec = _db.HomePage.FirstOrDefault();

            return rec;
        }
        [HttpPost]
        public async Task<object> Update(HomePage hp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rec = _db.HomePage.Find(hp.Id);

            rec.WelcomeBlockHeading = hp.WelcomeBlockHeading;
            rec.WelcomeBlockContent = hp.WelcomeBlockContent;
            rec.WelcomeBlockSubHeading = hp.WelcomeBlockSubHeading;
            rec.MissionStatementBlockHeading = hp.MissionStatementBlockHeading;
            rec.MissionStatementBlockContent = hp.MissionStatementBlockContent;
            rec.EmbededVideoUrl = hp.EmbededVideoUrl;
            rec.VideoDescription = hp.VideoDescription;
            await _db.SaveChangesAsync();
            return Ok("200");
        }

    }
}