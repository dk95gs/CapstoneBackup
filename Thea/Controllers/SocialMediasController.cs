using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thea.Models;

namespace Thea.Controllers
{
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
        public async Task<IActionResult> PutSocialMedia([FromRoute] int id, [FromBody] SocialMedia socialMedia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != socialMedia.Id)
            {
                return BadRequest();
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

            return NoContent();
        }

        // POST: api/SocialMedias
        [HttpPost]
        public async Task<IActionResult> PostSocialMedia([FromBody] SocialMedia socialMedia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SocialMedia.Add(socialMedia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSocialMedia", new { id = socialMedia.Id }, socialMedia);
        }

        // DELETE: api/SocialMedias/5
        [HttpDelete("{id}")]
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