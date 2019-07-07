using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thea.Models;

namespace Thea.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediasController : ControllerBase
    {
        private readonly AuthContext _context;

        public SocialMediasController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/SocialMedias
        [HttpGet]
        public IEnumerable<SocialMedia> GetSocialMedia()
        {
            return _context.SocialMedia;
        }

        // PUT: api/SocialMedias/5
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutSocialMedia([FromRoute] int id, [FromForm] SocialMedia socialMedia)
        {

            if (id != socialMedia.Id)
            {
                return BadRequest();
            }
            
            if (Request.Form.Files.Count > 0)
            {
                try
                {
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), socialMedia.ImageURL);

                    if (System.IO.File.Exists(uploads))
                    {
                        System.IO.File.Delete(uploads);
                    }
                }
                catch (Exception e)
                {
                    //file didnt exist
                }
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Random rand = new Random();
                var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                socialMedia.ImageURL = dbPath;
            }
            _context.Entry(socialMedia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SocialMediaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(socialMedia);
        }

        // POST: api/SocialMedias
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostSocialMedia([FromForm] SocialMedia socialMedia)
        {
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Resources", "Images");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    Random rand = new Random();
                    var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    socialMedia.ImageURL = dbPath;
                    
                }
                _context.SocialMedia.Add(socialMedia);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
            return CreatedAtAction("GetSocialMedia", new { id = socialMedia.Id }, socialMedia);
        }

        // DELETE: api/SocialMedias/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSocialMedia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var socialMedia = await _context.SocialMedia.FindAsync(id);
            if (socialMedia == null)
            {
                return NotFound();
            }

            try
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), socialMedia.ImageURL);

                if (System.IO.File.Exists(uploads))
                {
                    System.IO.File.Delete(uploads);
                }
            }
            catch (Exception e)
            {
                //file didnt exist
            }

            _context.SocialMedia.Remove(socialMedia);
            await _context.SaveChangesAsync();

            return Ok(socialMedia);
        }

        private bool SocialMediaExists(int id)
        {
            return _context.SocialMedia.Any(e => e.Id == id);
        }
    }
}