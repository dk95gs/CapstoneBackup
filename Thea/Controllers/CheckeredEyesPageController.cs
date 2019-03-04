﻿using System;
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
    public class CheckeredEyesPageController : ControllerBase
    {
        private readonly AuthContext _db;

        public CheckeredEyesPageController(AuthContext db)
        {
            _db = db;
        }
        [HttpGet]
        public object GetContent()
        {
            var rec = _db.CheckeredEyesPages.FirstOrDefault();

            return rec;
        }
        [HttpPost]
        public async Task<object> Update(CheckeredEyesPage cep)
        {
            var rec = _db.CheckeredEyesPages.Find(cep.Id);
            if (rec == null)
            {
                _db.Add(cep);
            }
            else
            {

                rec.AttentionLowVissionBlockTitle = cep.AttentionLowVissionBlockTitle;
                rec.AttentionLowVisionBlockContent = cep.AttentionLowVisionBlockContent;
                rec.AttentionSightedBlockTitle = cep.AttentionSightedBlockTitle;
                rec.AttentionSightedBlockContent = cep.AttentionSightedBlockContent;
                rec.SymbolUseBlockTitle = cep.SymbolUseBlockTitle;
                rec.SymbolUseBlockDescription = cep.SymbolUseBlockDescription;
                rec.SymbolUseQAList = cep.SymbolUseQAList;
            }
            await _db.SaveChangesAsync();
            return Ok("200");
        }
    }
}