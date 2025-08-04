using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Control_Estacionamientos_API.Model
{
    public class Autorizacion
    {
        [Key]
        public int cod_autorizacion {  get; set; }
        [ForeignKey("Cliente")]
        public required string dni_cliente { get; set; }
        public required string cod_vehiculo { get; set; }
        public required string dni_autorizado { get; set; }
        public required string nom_autorizado { get; set; }
        public required string ape_autorizado { get; set; }

        public static int GenerarCodAutorizacion()
        {
            Random random = new();
            return random.Next(100000, 1000000);
        }
    }
}
