using API.Models.EntityModel;
using Microsoft.EntityFrameworkCore;

namespace API.Models.DataAccessModel
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Sucursal> Sucursales { get; set; }
        public DbSet<Moneda> Monedas { get; set; }
    }

}
