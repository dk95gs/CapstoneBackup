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
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadablesController : ControllerBase
    {
        private readonly AuthContext _context;

        public DownloadablesController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/Downloadables
        [HttpGet]
        public IEnumerable<Downloadables> GetDownloadables()
        {
            return _context.Downloadables;
        }

        // PUT: api/Downloadables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDownloadables([FromRoute] int id, [FromBody] Downloadables downloadables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != downloadables.Id)
            {
                return BadRequest();
            }

            _context.Entry(downloadables).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DownloadablesExists(id))
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

        // POST: api/Downloadables
        [HttpPost]
        public async Task<IActionResult> PostDownloadables([FromBody] Downloadables downloadables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Downloadables.Add(downloadables);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDownloadables", new { id = downloadables.Id }, downloadables);
        }

        // DELETE: api/Downloadables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDownloadables([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var downloadables = await _context.Downloadables.FindAsync(id);
            if (downloadables == null)
            {
                return NotFound();
            }

            _context.Downloadables.Remove(downloadables);
            await _context.SaveChangesAsync();

            return Ok(downloadables);
        }

        private bool DownloadablesExists(int id)
        {
            return _context.Downloadables.Any(e => e.Id == id);
        }
    }
}