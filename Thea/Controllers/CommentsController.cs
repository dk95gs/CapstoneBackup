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
    public class CommentsController : ControllerBase
    {
        private readonly AuthContext _context;

        public CommentsController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/Comments
        [HttpGet("{id}")]
        public IEnumerable<Comment> GetComment([FromRoute] int id)
        {
            return _context.Comment.Where(m=>m.BlogId == id).OrderByDescending(m => m.PostedDate);
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<IActionResult> PostComment([FromBody] Comment comment)
        {
            comment.PostedDate = DateTime.Now;
            _context.Comment.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _context.Comment.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comment.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        private bool CommentExists(int id)
        {
            return _context.Comment.Any(e => e.Id == id);
        }
    }
}