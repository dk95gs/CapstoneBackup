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
        public async Task<IActionResult> PutShopItems([FromRoute] int id, [FromBody] ShopItems shopItems)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != shopItems.Id)
            {
                return BadRequest();
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
        public async Task<IActionResult> PostShopItems([FromBody] ShopItems shopItems)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ShopItems.Add(shopItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShopItems", new { id = shopItems.Id }, shopItems);
        }

        // DELETE: api/ShopItems/5
        [HttpDelete("{id}")]
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