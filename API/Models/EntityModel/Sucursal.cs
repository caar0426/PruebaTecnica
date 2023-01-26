using API.Models.VewModel;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.EntityModel
{
    public class Sucursal
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        [Required(ErrorMessage = "La descripción es requerida")]
        [StringLength(250, ErrorMessage = "La descripción no puede tener más de 250 caracteres")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "La dirección es requerida")]
        [StringLength(250, ErrorMessage = "La dirección no puede tener más de 250 caracteres")]
        public string Direccion { get; set; }
        [Required(ErrorMessage = "La identificación es requerida")]
        [StringLength(50, ErrorMessage = "La identificación no puede tener más de 50 caracteres")]
        public string Identificacion { get; set; }
        [Required(ErrorMessage = "La fecha de creación es requerida")]
        public DateTime FechaCreacion { get; set; }
        public Moneda Moneda { get; set; }
        public int MonedaId { get; set; }

        public SucursalGetVM ConvertToModel(Sucursal entity)
        {
            SucursalGetVM model = new SucursalGetVM
            {
                Id = this.Id,
                Codigo = this.Codigo,
                Descripcion = this.Descripcion,
                Direccion = this.Direccion,
                FechaCreacion = this.FechaCreacion,
                Identificacion = this.Identificacion,
                MonedaId = this.MonedaId,
                MonedaString = this.Moneda.NombreTipo
            };
            return model;
        }
    }

}
