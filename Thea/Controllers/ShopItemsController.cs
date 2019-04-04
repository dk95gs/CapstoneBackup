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
    public class ShopItemsController : ControllerBase
    {
        private readonly AuthContext _context;

        public ShopItemsController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/ShopItems
        [HttpGet]
        public IEnumerable<ShopItems> GetShopItems()
        {
            return _context.ShopItems;
        }

        // GET: api/ShopItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShopItems([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shopItems = await _context.ShopItems.FindAsync(id);

            if (shopItems == null)
            {
                return NotFound();
            }

            return Ok(shopItems);
        }

        // PUT: api/ShopItems/5
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutShopItems([FromRoute] int id, [FromForm] ShopItems shopItems)
        {

            if (id != shopItems.Id)
            {
                return BadRequest();
            }
            if (Request.Form.Files.Count > 0)
            {
                try
                {
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), shopItems.ImageURL);

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
                shopItems.ImageURL = dbPath;
            }
            _context.Entry(shopItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopItemsExists(id))
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

        // POST: api/ShopItems
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostShopItems([FromForm] ShopItems shopItems)
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
                    shopItems.ImageURL = dbPath;

                }

                _context.ShopItems.Add(shopItems);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error");
            }

            return CreatedAtAction("GetShopItems", new { id = shopItems.Id }, shopItems);
        }

        // DELETE: api/ShopItems/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteShopItems([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var shopItems = await _context.ShopItems.FindAsync(id);
            if (shopItems == null)
            {
                return NotFound();
            }
            try
            {
                var uploads = Path.Combine(Directory.GetCurrentDirectory(), shopItems.ImageURL);

                if (System.IO.File.Exists(uploads))
                {
                    System.IO.File.Delete(uploads);
                }
            }
            catch (Exception e)
            {
                //file didnt exist
            }
            _context.ShopItems.Remove(shopItems);
            await _context.SaveChangesAsync();

            return Ok(shopItems);
        }

        private bool ShopItemsExists(int id)
        {
            return _context.ShopItems.Any(e => e.Id == id);
        }
    }
}