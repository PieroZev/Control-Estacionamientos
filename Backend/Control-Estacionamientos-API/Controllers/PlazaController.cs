using Control_Estacionamientos_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Estacionamientos_API.Controllers
{
    [ApiController]
    [Route("api/plaza")]
    public class PlazaController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PlazaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/plaza
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plaza>>> GetPlazas()
        {
            return await _context.Plaza.ToListAsync();
        }

        // GET: api/plaza/{id}
        [HttpGet("{num}")]
        public async Task<ActionResult<Plaza>> GetPlaza(int num)
        {
            var plaza = await _context.Plaza.FindAsync(num);

            if (plaza == null)
                return NotFound();

            return plaza;
        }

        // POST: api/plaza
        [HttpPost]
        public async Task<ActionResult<Plaza>> CreatePlaza(Plaza plaza)
        {
            _context.Plaza.Add(plaza);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlaza), new { num = plaza.num_plaza }, plaza);
        }

        // PUT: api/plaza/{id}
        [HttpPut("{num}")]
        public async Task<IActionResult> PutPlaza(int num, Plaza plaza)
        {
            if (num != plaza.num_plaza)
            {
                return BadRequest("El ID de la URL no coincide con el del cuerpo.");
            }

            var plazaExistente = await _context.Plaza.FindAsync(num);
            if (plazaExistente == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            plazaExistente.num_plaza = plaza.num_plaza;
            plazaExistente.dni_cliente = plaza.dni_cliente;
            plazaExistente.cod_vehiculo = plaza.cod_vehiculo;
            plazaExistente.cod_autorizacion = plaza.cod_autorizacion;

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

        // DELETE: api/plaza/{id}
        [HttpDelete("{num}")]
        public async Task<IActionResult> DeletePlaza(int num)
        {
            var plaza = await _context.Plaza.FindAsync(num);

            if (plaza == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            plaza.dni_cliente = string.Empty;
            plaza.cod_vehiculo = string.Empty;
            plaza.cod_autorizacion = 0;

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
    }
}
