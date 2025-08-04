using Control_Estacionamientos_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Estacionamientos_API.Controllers
{
    [ApiController]
    [Route("api/vehiculo")]
    public class VehiculoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public VehiculoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/vehiculo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehiculo>>> GetVehiculos()
        {
            return await _context.Vehiculo.ToListAsync();
        }

        // GET: api/vehiculo/{id}
        [HttpGet("{cod}")]
        public async Task<ActionResult<Vehiculo>> GetVehiculo(string cod)
        {
            var vehiculo = await _context.Vehiculo.FindAsync(cod);

            if (vehiculo == null)
                return NotFound();

            return vehiculo;
        }

        // POST: api/vehiculo
        [HttpPost]
        public async Task<ActionResult<Vehiculo>> CreateVehiculo(Vehiculo vehiculo)
        {
            _context.Vehiculo.Add(vehiculo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehiculo), new { num = vehiculo.cod_vehiculo }, vehiculo);
        }

        // PUT: api/vehiculo/{id}
        [HttpPut("{cod}")]
        public async Task<IActionResult> PutVehiculo(string cod, Vehiculo vehiculo)
        {
            if (cod != vehiculo.cod_vehiculo)
            {
                return BadRequest("El ID de la URL no coincide con el del cuerpo.");
            }

            var vehiculoExistente = await _context.Vehiculo.FindAsync(cod);
            if (vehiculoExistente == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            vehiculoExistente.cod_vehiculo = vehiculo.cod_vehiculo;
            vehiculoExistente.tipo_vehiculo = vehiculo.tipo_vehiculo;
            vehiculoExistente.dni_cliente = vehiculo.dni_cliente;
            vehiculoExistente.modelo = vehiculo.modelo;
            vehiculoExistente.marca = vehiculo.marca;
            vehiculoExistente.color = vehiculo.color;
            vehiculoExistente.altura = vehiculo.altura;
            vehiculoExistente.ancho = vehiculo.ancho;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error al actualizar en la base de datos.");
            }

            return NoContent();
        }

        // DELETE: api/vehiculo/{id}
        [HttpDelete("{cod}")]
        public async Task<IActionResult> DeletePlaza(string cod)
        {
            var vehiculo = await _context.Vehiculo.FindAsync(cod);

            if (vehiculo == null)
            {
                return NotFound();
            }

            _context.Vehiculo.Remove(vehiculo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
