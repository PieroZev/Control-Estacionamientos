using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Control_Estacionamientos_API.Model;

namespace Control_Estacionamientos_API
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Registro>()
                .HasKey(i => new { i.num_plaza, i.dni_conductor, i.cod_vehiculo, i.fec_hora });
        }
        public DbSet<Autorizacion> Autorizacion { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Plaza> Plaza { get; set; }
        public DbSet<Registro> Registro { get; set; }
        public DbSet<Vehiculo> Vehiculo { get; set; }
    }

}
