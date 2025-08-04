using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Control_Estacionamientos_API.Model
{
    public class Vehiculo
    {
        [Key]
        public required string cod_vehiculo { get; set; }
        public required string tipo_vehiculo { get; set; }
        public required string modelo { get; set; }
        public required string marca { get; set; }
        public required string color { get; set; }
        public required double altura { get; set; }
        public required double ancho { get; set; }
        public required string dni_cliente { get; set; }
    }
}
