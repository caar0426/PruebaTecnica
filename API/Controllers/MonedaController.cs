using API.Models.DataAccessModel;
using API.Models.VewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonedaController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public MonedaController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MonedaGetVM>>> GetSucursales()
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var monedas = await _db.Monedas
                    .Select(i => i.ConvertToModel(i))
                    .ToListAsync();

                if (monedas == null)
                {
                    return NotFound();
                }
                tran.Commit();
                return Ok(new { success = true, monedas });

            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }
    }
}