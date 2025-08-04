using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Control_Estacionamientos_API.Model
{
    public class Plaza
    {
        [Key]
        public int num_plaza { get; set; }
        public string? dni_cliente { get; set; }
        public string? cod_vehiculo { get; set; }
        public int? cod_autorizacion {  get; set; }
    }
}
