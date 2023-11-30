using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/carro")]
public class CarroController : ControllerBase
{
    private readonly AppDataContext _context;

    public CarroController(AppDataContext context)
    {
        _context = context;
    }

    //POST: api/carro/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Carro carro)
    {
        try
        {
            Patio? patio =
                _context.Patios.Find(carro.PatioId);
            if (patio == null)
            {
                return NotFound();
            }
            carro.Patio = patio;
            _context.Carros.Add(carro);
            _context.SaveChanges();
            return Created("", carro);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(e.Message);
        }
    }

    //GET: api/carro/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Carro> carros = 
                _context.Carros
                .Include(x => x.Patio)
                .ToList();
            return carros.Count == 0 ? NotFound() : Ok(carros);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET: api/carro/buscar/{id}
    [HttpGet]
    [Route("buscar/{id}")]
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            Carro? carroCadastrado =
                _context.Carros
                .Include(x => x.Patio)
                .FirstOrDefault(x => x.CarroId == id);
            if (carroCadastrado != null)
            {
                return Ok(carroCadastrado);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //PUT: api/carro/alterar/{id}
    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Carro carro)
    {
        try
        {
            Carro? carroCadastrado =
                _context.Carros.FirstOrDefault(x => x.CarroId == id);
            
            if (carroCadastrado != null)
            {
                Patio? patio =
                    _context.Patios.Find(carro.PatioId);
                if (patio == null)
                {
                    return NotFound();
                }
                carroCadastrado.Patio = patio;
                carroCadastrado.Marca = carro.Marca;
                carroCadastrado.Modelo = carro.Modelo;
                carroCadastrado.Placa = carro.Placa;
                _context.Carros.Update(carroCadastrado);
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

    //DELETE: api/carro/deletar/{id}
    [HttpDelete]
    [Route("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            Carro? carroCadastrado = _context.Carros.Find(id);
            if (carroCadastrado != null)
            {
                _context.Carros.Remove(carroCadastrado);
                _context.SaveChanges();
                return Ok(_context.Carros
                .Include(x => x.Patio)
                .ToList());
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET: api/carro/porPatio/{patioId}
    [HttpGet("porPatio/{patioId}")]
    public IActionResult GetByPatio(int patioId)
    {
        var carros = _context.Carros.Where(c => c.PatioId == patioId).ToList();
        return Ok(carros);
    }

}
