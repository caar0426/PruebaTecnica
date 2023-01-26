using API.Models.VewModel;
using System.Collections.Generic;

namespace API.Models.EntityModel
{
    public class Moneda
    {
        public Moneda()
        {
            this.Sucursales = new HashSet<Sucursal>();
        }
        public int Id { get; set; }
        public string NombreTipo { get; set; }
        public virtual ICollection<Sucursal> Sucursales { get; set; }

        public MonedaGetVM ConvertToModel(Moneda entity)
        {
            MonedaGetVM model = new MonedaGetVM
            {
                Id = this.Id,
                NombreTipo = this.NombreTipo
            };
            return model;
        }
    }
}
