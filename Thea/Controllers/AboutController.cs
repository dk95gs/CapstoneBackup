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
    public class AboutController : ControllerBase
    {
        private readonly AuthContext _db;

        public AboutController(AuthContext db)
        {
            _db = db;
        }
        [HttpGet]
        public object GetContent()
        {

            var rec = _db.AboutPage.FirstOrDefault();

            return rec;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<object> Update(AboutPage ap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var rec = _db.AboutPage.Find(ap.Id);

            if (rec == null)
            {
                AboutPage tempAbout = new AboutPage
                {
                    AboutBlockHeading = ap.AboutBlockHeading,
                    AboutBlockContent = ap.AboutBlockContent,
                    AchnowledgementsBlockTitle = ap.AchnowledgementsBlockTitle,
                    AchnowledgementsBlockDescription = ap.AchnowledgementsBlockDescription,
                    AchnowledgementsBlockList = ap.AchnowledgementsBlockList,
                    FAQBlockQA = ap.FAQBlockQA
            };
                _db.Add(tempAbout);
            }
            else
            {
                rec.AboutBlockHeading = ap.AboutBlockHeading;
                rec.AboutBlockContent = ap.AboutBlockContent;
                rec.AchnowledgementsBlockTitle = ap.AchnowledgementsBlockTitle;
                rec.AchnowledgementsBlockDescription = ap.AchnowledgementsBlockDescription;
                rec.AchnowledgementsBlockList = ap.AchnowledgementsBlockList;
                rec.FAQBlockQA = ap.FAQBlockQA;
            }
            await _db.SaveChangesAsync();
            return Ok("200");
        }
    }
}