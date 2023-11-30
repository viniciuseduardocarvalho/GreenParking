using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/patio")]
public class PatioController : ControllerBase
{
    private readonly AppDataContext _context;

    public PatioController(AppDataContext context)
    {
        _context = context;
    }

    //POST: api/patio/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Patio patio)
    {
        try
        {
            _context.Add(patio);
            _context.SaveChanges();
            return Created("", patio);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET: api/patio/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Patio> patios = _context.Patios.ToList();
            return patios.Count == 0 ? NotFound() : Ok(patios);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET: api/patio/buscar/{id}
    [HttpGet]
    [Route("buscar/{id}")]
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            Patio? patioCadastrado =
                _context.Patios
                .FirstOrDefault(x => x.PatioId == id);
            if (patioCadastrado != null)
            {
                return Ok(patioCadastrado);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //PUT: api/patio/alterar/{id}
    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Patio patio)
    {
        try
        {
            Patio? patioCadastrado =
                _context.Patios.FirstOrDefault(x => x.PatioId == id);
            
            if (patioCadastrado != null)
            {
                patioCadastrado.Nome = patio.Nome;
                patioCadastrado.Endereco = patio.Endereco;
                patioCadastrado.QuantidadeVagas = patio.QuantidadeVagas;
                _context.Patios.Update(patioCadastrado);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //DELETE: api/patio/deletar/{id}
    [HttpDelete]
    [Route("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            Patio? patioCadastrado = _context.Patios.Find(id);
            if (patioCadastrado != null)
            {
                
                bool possuiCarrosEstacionado = _context.Carros.Any(c => c.PatioId == id);
                if (possuiCarrosEstacionado)
                {
                    return BadRequest("Não é possível deletar esse pátio. Há carro(s) estacionado(s) nele.");
                }
                _context.Patios.Remove(patioCadastrado);
                _context.SaveChanges();
                return Ok(_context.Patios
                .ToList());
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
