using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Thea.Models;

namespace Thea.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly AuthContext _db;
        public ReportsController(AuthContext db)
        {
            _db = db;
        }
        [HttpGet]
        [Route("BlogsReport")]
        public IEnumerable<Blog> BlogReport()
        {
            var rec = _db.Blog.Where(m=>m.PostedDate.Month == DateTime.Now.Month);
            return rec;
        }
        [HttpGet]
        [Route("StoreReport")]
        public IEnumerable<ShopItems> ShopReport()
        {
            var rec = _db.ShopItems.ToList();
            return rec;
        }
    }
}