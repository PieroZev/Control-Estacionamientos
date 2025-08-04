using Control_Estacionamientos_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Estacionamientos_API.Controllers
{
    [ApiController]
    [Route("api/autorizacion")]
    public class AutorizacionController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AutorizacionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/autorizacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autorizacion>>> GetAutorizaciones()
        {
            return await _context.Autorizacion.ToListAsync();
        }

        // GET: api/autorizacion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Autorizacion>> GetAutorizacion(int id)
        {
            var autorizacion = await _context.Autorizacion.FindAsync(id);

            if (autorizacion == null)
                return NotFound();

            return autorizacion;
        }

        // POST: api/autorizacion
        [HttpPost]
        public async Task<ActionResult<Autorizacion>> CreateAutorizacion(Autorizacion autorizacion)
        {
            _context.Autorizacion.Add(autorizacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAutorizacion), new { id = autorizacion.cod_autorizacion }, autorizacion);
        }

        // PUT: api/autorizacion/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActualizacion(int id, Autorizacion autorizacion)
        {
            if (id != autorizacion.cod_autorizacion)
            {
                return BadRequest("El ID de la URL no coincide con el del cuerpo.");
            }

            var autorizacionExistente = await _context.Autorizacion.FindAsync(id);
            if (autorizacionExistente == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            autorizacionExistente.dni_cliente = autorizacion.dni_cliente;
            autorizacionExistente.cod_vehiculo = autorizacion.cod_vehiculo;
            autorizacionExistente.dni_autorizado = autorizacion.dni_autorizado;
            autorizacionExistente.nom_autorizado = autorizacion.nom_autorizado;
            autorizacionExistente.ape_autorizado = autorizacion.ape_autorizado;

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

        // DELETE: api/autorizacion/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutorizacion(int id)
        {
            var autorizacion = await _context.Autorizacion.FindAsync(id);

            if (autorizacion == null)
            {
                return NotFound();
            }

            _context.Autorizacion.Remove(autorizacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
