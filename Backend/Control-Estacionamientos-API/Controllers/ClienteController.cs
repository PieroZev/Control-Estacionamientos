using Control_Estacionamientos_API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Estacionamientos_API.Controllers
{
    [ApiController]
    [Route("api/cliente")]
    public class ClienteController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClienteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Cliente.ToListAsync();
        }

        // GET: api/cliente/{id}
        [HttpGet("{dni}")]
        public async Task<ActionResult<Cliente>> GetCliente(string dni)
        {
            var cliente = await _context.Cliente.FindAsync(dni);

            if (cliente == null)
                return NotFound();

            return cliente;
        }

        // POST: api/cliente
        [HttpPost]
        public async Task<ActionResult<Cliente>> CreateCliente(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { dni = cliente.dni_cliente }, cliente);
        }

        // PUT: api/cliente/{id}
        [HttpPut("{dni}")]
        public async Task<IActionResult> PutCliente(string dni, Cliente cliente)
        {
            if (dni != cliente.dni_cliente)
            {
                return BadRequest("El ID de la URL no coincide con el del cuerpo.");
            }

            var clienteExistente = await _context.Cliente.FindAsync(dni);
            if (clienteExistente == null)
            {
                return NotFound();
            }

            // Actualizar propiedades
            clienteExistente.dni_cliente = cliente.dni_cliente;
            clienteExistente.nom_cliente = cliente.nom_cliente;
            clienteExistente.ape_cliente = cliente.ape_cliente;
            clienteExistente.dir_cliente = cliente.dir_cliente;
            clienteExistente.cod_postal = cliente.cod_postal;
            clienteExistente.tel_cliente = cliente.tel_cliente;
            clienteExistente.mail_cliente = cliente.mail_cliente;

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

        // DELETE: api/cliente/{id}
        [HttpDelete("{dni}")]
        public async Task<IActionResult> DeleteCliente(string dni)
        {
            var cliente = await _context.Cliente.FindAsync(dni);

            if (cliente == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
