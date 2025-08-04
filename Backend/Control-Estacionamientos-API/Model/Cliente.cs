using System.ComponentModel.DataAnnotations;

namespace Control_Estacionamientos_API.Model
{
    public class Cliente
    {
        [Key]
        public required string dni_cliente { get; set; }
        public required string nom_cliente { get; set; }
        public required string ape_cliente { get; set; }
        public string? dir_cliente { get; set; }
        public string? cod_postal { get; set; }
        public required string tel_cliente { get; set; }
        public required string mail_cliente { get; set; }

    }
}
