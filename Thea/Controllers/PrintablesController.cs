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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutPrintables([FromRoute] int id, [FromForm] Printables printables)
        {
            if (id != printables.Id)
            {
                return BadRequest();
            }
            if (Request.Form.Files.Count > 0)
            {
                try
                {
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), printables.SrcURL);

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
                var folderName = Path.Combine("Resources", "Printables");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Random rand = new Random();
                var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                printables.SrcURL = dbPath;
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostPrintables([FromForm] Printables printables)
        {
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Resources", "Printables");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    Random rand = new Random();
                    var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    printables.SrcURL = dbPath;

                }
                _context.Printables.Add(printables);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
            return CreatedAtAction("GetPrintables", new { id = printables.Id }, printables);
        }

        // DELETE: api/Printables/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

            try
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), printables.SrcURL);

                if (System.IO.File.Exists(uploads))
                {
                    System.IO.File.Delete(uploads);
                }
            }
            catch (Exception e)
            {
                //file didnt exist
            }

            return Ok(printables);
        }

        private bool PrintablesExists(int id)
        {
            return _context.Printables.Any(e => e.Id == id);
        }
    }
}