using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
        public async Task<IActionResult> PutDownloadables([FromRoute] int id, [FromForm] Downloadables downloadables)
        {

            if (id != downloadables.Id)
            {
                return BadRequest();
            }

            if (Request.Form.Files.Count > 0)
            {
                try
                {
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), downloadables.SrcURL);

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
                var folderName = Path.Combine("Resources", "Downloads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Random rand = new Random();
                var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                downloadables.SrcURL = dbPath;
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
        public async Task<IActionResult> PostDownloadables([FromForm] Downloadables downloadables)
        {
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine("Resources", "Downloads");
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    Random rand = new Random();
                    var fileName = rand.Next(1, 100000).ToString() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    downloadables.SrcURL = dbPath;

                }
                _context.Downloadables.Add(downloadables);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
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

            try
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), downloadables.SrcURL);

                if (System.IO.File.Exists(uploads))
                {
                    System.IO.File.Delete(uploads);
                }
            }
            catch (Exception e)
            {
                //file didnt exist
            }

            return Ok(downloadables);
        }

        private bool DownloadablesExists(int id)
        {
            return _context.Downloadables.Any(e => e.Id == id);
        }
    }
}