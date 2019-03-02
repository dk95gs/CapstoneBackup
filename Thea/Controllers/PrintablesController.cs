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
    public class PrintablesController : ControllerBase
    {
        private readonly AuthContext _context;

        public PrintablesController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/Printables
        [HttpGet]
        public IEnumerable<Printables> GetPrintables()
        {
            return _context.Printables;
        }

        // PUT: api/Printables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrintables([FromRoute] int id, [FromBody] Printables printables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != printables.Id)
            {
                return BadRequest();
            }

            _context.Entry(printables).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrintablesExists(id))
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

        // POST: api/Printables
        [HttpPost]
        public async Task<IActionResult> PostPrintables([FromBody] Printables printables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Printables.Add(printables);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrintables", new { id = printables.Id }, printables);
        }

        // DELETE: api/Printables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrintables([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var printables = await _context.Printables.FindAsync(id);
            if (printables == null)
            {
                return NotFound();
            }

            _context.Printables.Remove(printables);
            await _context.SaveChangesAsync();

            return Ok(printables);
        }

        private bool PrintablesExists(int id)
        {
            return _context.Printables.Any(e => e.Id == id);
        }
    }
}