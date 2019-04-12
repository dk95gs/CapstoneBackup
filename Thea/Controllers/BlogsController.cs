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
using Newtonsoft.Json;
using Thea.Models;

namespace Thea.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly AuthContext _context;

        public BlogsController(AuthContext context)
        {
            _context = context;
        }

        // GET: api/Blogs
        [HttpGet]
        public IEnumerable<Blog> GetBlog()
        {
            return _context.Blog.OrderByDescending(m => m.PostedDate);
        }

        // GET: api/Blogs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlog([FromRoute] int id)
        {
            var blog = await _context.Blog.FindAsync(id);

            if (blog == null)
            {
                return NotFound();
            }

            return Ok(blog);
        }

        // PUT: api/Blogs/5
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutBlog([FromRoute] int id, [FromForm] Blog blog)
        {

            if (id != blog.Id)
            {
                return BadRequest();
            }

            if (Request.Form.Files.Count > 0)
            {
                List<string> tempArr = JsonConvert.DeserializeObject<List<string>>(blog.pictureSrcList);
                if(tempArr == null)
                {
                    tempArr = new List<string>();
                }
                for (int i = 0; i < Request.Form.Files.Count; i++)
                {
                    var file = Request.Form.Files[i];
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
                    tempArr.Add("Resources/Images/" + fileName);
                }
                blog.pictureSrcList = JsonConvert.SerializeObject(tempArr);
            }

            _context.Entry(blog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BlogExists(id))
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

        // POST: api/Blogs
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PostBlog([FromForm] Blog blog)
        {
            
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    List<string> tempArr = new List<string>();
                    for (int i = 0; i < Request.Form.Files.Count; i++)
                    {
                        var file = Request.Form.Files[i];
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
                        tempArr.Add("Resources/Images/" + fileName);
                    }
                    blog.pictureSrcList = JsonConvert.SerializeObject(tempArr);
                }

                blog.PostedDate = DateTime.Now;
                _context.Blog.Add(blog);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
            return CreatedAtAction("GetBlog", new { id = blog.Id }, blog);
        }

        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteBlog([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            try
            {
                string[] tempArr = JsonConvert.DeserializeObject<string[]>(blog.pictureSrcList);
                for (int i = 0; i < tempArr.Length; i++)
                {
                    var uploads = Path.Combine(Directory.GetCurrentDirectory(), tempArr[i]);

                    if (System.IO.File.Exists(uploads))
                    {
                        System.IO.File.Delete(uploads);
                    }
                }
            }
            catch (Exception e)
            {
                //file didnt exist
            }
            _context.Blog.Remove(blog);
            await _context.SaveChangesAsync();

            return Ok(blog);
        }
        [HttpPost]
        [Route("DeleteImage")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteSingleBlogImage(Blog blog)
        {
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), blog.Title);
            var rec = _context.Blog.Find(blog.Id);
            if(rec == null){
                return BadRequest();
            }
            if (System.IO.File.Exists(uploads))
            {
                System.IO.File.Delete(uploads);
            }
            rec.pictureSrcList = blog.pictureSrcList;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool BlogExists(int id)
        {
            return _context.Blog.Any(e => e.Id == id);
        }
    }
}