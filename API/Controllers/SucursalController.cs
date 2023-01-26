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
    public class SucursalController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        
        public SucursalController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SucursalGetVM>>> GetSucursales()
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var sucursales = await _db.Sucursales
                    .Include(i => i.Moneda)
                    .Select(i => i.ConvertToModel(i))
                    .ToListAsync();

                if (sucursales == null)
                {
                    return NotFound();
                }
                tran.Commit();
                return Ok(new { success = true, sucursales});

            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SucursalGetVM>> GetSucursal(int id)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var sucursal = await _db.Sucursales
                    .Include(i => i.Moneda)
                    .Where(i => i.Id == id)
                    .Select(i => i.ConvertToModel(i))
                    .FirstOrDefaultAsync();

                if (sucursal == null)
                {
                    return NotFound(new { success = false });
                }
                tran.Commit();
                return Ok(new { success = true, sucursal });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }


        [HttpPost]
        public async Task<ActionResult<SucursalCreate>> PostSucursal(SucursalCreate sucursal)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                _db.Sucursales.Add(sucursal.ConvertToEntity());
                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, sucursal });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSucursal(int id, SucursalUpdate sucursal)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                if (id != sucursal.Id)
                {
                    tran.Rollback();
                    return BadRequest(new { success = false });
                }

                if (!SucursalExists(id))
                {
                    tran.Rollback();
                    return NotFound(new { success = false });
                }

                _db.Entry(sucursal.ConvertToEntity()).State = EntityState.Modified;

                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, sucursal });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<SucursalGetVM>> DeleteSucursal(int id)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var sucursal = await _db.Sucursales
                    .Include(i => i.Moneda)
                    .Where(i => i.Id == id)
                    .FirstOrDefaultAsync();
                if (sucursal == null)
                {
                    tran.Rollback();
                    return NotFound(new { success = false });
                }

                var model = sucursal.ConvertToModel(sucursal);

                _db.Sucursales.Remove(sucursal);
                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, model });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }

        private bool SucursalExists(int id)
        {
            try
            {
                return _db.Sucursales.Any(e => e.Id == id);
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }

}
