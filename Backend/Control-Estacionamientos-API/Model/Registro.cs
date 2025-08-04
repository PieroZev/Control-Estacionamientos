using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Control_Estacionamientos_API.Model
{
    public class Registro()
    {
        [ForeignKey("Plaza")]
        public int num_plaza { get; set; }
        public required string dni_conductor { get; set; }
        public required string cod_vehiculo { get; set; }
        public required string ios { get; set; }
        public DateTime fec_hora { get; set; }
    }
}
