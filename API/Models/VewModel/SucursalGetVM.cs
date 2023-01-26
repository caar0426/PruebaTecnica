using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace API.Models.VewModel
{
    public class SucursalGetVM
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Identificacion { get; set; }
        
        private DateTime _fechaCreacion;
        private string _fechaCreacionString;

        public DateTime FechaCreacion
        {
            get { return _fechaCreacion; }
            set
            {
                _fechaCreacion = value;
                _fechaCreacionString = _fechaCreacion.ToString("yyyy-MM-dd");
            }
        }

        public string FechaCreacionString
        {
            get { return _fechaCreacionString; }
        }

        public string MonedaString { get; set; }
        public int MonedaId { get; set; }

    }
}
