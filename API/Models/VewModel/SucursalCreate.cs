using API.Models.EntityModel;
using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace API.Models.VewModel
{
    public class SucursalCreate
    {
        public SucursalCreate()
        {
            Id = null;
        }
        public int? Id { get; set; }
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
        [JsonConverter(typeof(IsoDateTimeConverter))]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Range(typeof(DateTime), "2023-01-25", "9999-12-31", ErrorMessage = "La fecha no puede ser menor a la fecha actual.")]
        public DateTime FechaCreacion { get; set; }

        [Required(ErrorMessage = "La moneda es requerida")]
        public int MonedaId { get; set; }

        public Sucursal ConvertToEntity()
        {
            Sucursal entity = new Sucursal
            {
                Codigo = this.Codigo,
                Descripcion = this.Descripcion,
                Direccion = this.Direccion,
                FechaCreacion = this.FechaCreacion,
                Identificacion = this.Identificacion,
                MonedaId = this.MonedaId
            };
            return entity;
        }
    }
}
