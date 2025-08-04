using Control_Estacionamientos_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Estacionamientos_API.Controllers
{
    [ApiController]
    [Route("api/registro")]
    public class RegistroController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegistroController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/registro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Registro>>> GetRegistros()
        {
            return await _context.Registro.ToListAsync();
        }

        // POST: api/registro/buscar
        [HttpPost("buscar")]
        public async Task<ActionResult<IEnumerable<Registro>>> BuscarRegistro([FromBody] Registro registro)
        {
            var query = _context.Registro.AsQueryable();

            if (registro.num_plaza > 0)
                query = query.Where(r => r.num_plaza == registro.num_plaza);

            if (!string.IsNullOrEmpty(registro.dni_conductor))
                query = query.Where(r => r.dni_conductor == registro.dni_conductor);

            if (!string.IsNullOrEmpty(registro.cod_vehiculo))
                query = query.Where(r => r.cod_vehiculo == registro.cod_vehiculo);

            if (!string.IsNullOrEmpty(registro.ios))
                query = query.Where(r => r.ios == registro.ios);

            if (registro.fec_hora != default)
                query = query.Where(r => r.fec_hora.Date == registro.fec_hora.Date);

            var resultado = await query.ToListAsync();

            if (resultado == null)
                return NotFound();

            return resultado;
        }

        // POST: api/registro
        [HttpPost]
        public async Task<ActionResult<Registro>> CreateRegistro(Registro registro)
        {
            _context.Registro.Add(registro);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(BuscarRegistro), new { registro });
        }
    }
}
