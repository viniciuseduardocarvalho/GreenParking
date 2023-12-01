//Utilizamos o Microsoft.AspNetCore.Mvc para a implementação do padrão arquitetural Model-View-Controller.
using Microsoft.AspNetCore.Mvc;
//Utilizamos o EntityFrameworkCore para os 'Include' de outra classe (Patio) dentro dessa (Carro).
using Microsoft.EntityFrameworkCore;
//Declaração das namespace que estamos utilizando, nesse caso aquilo referente a Models e Data (Banco de Dados).
using API.Data;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/carro")]
//public class CarroController herda do ControllerBase, classe base de controller encontrada dentro do AspNetCore.Mvc
public class CarroController : ControllerBase
{
    //Declaração de campo apenas para leitura do tipo AppDataContext nomeado _context (este realizará comunicação com o Banco de Dados).
    private readonly AppDataContext _context;

    public CarroController(AppDataContext context)
    {
        _context = context;
    }

    //POST: api/carro/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //Aqui, o método Cadastrar envia os dados do carro a ser cadastrado a partir do corpo (FromBody) da requisição.
    public IActionResult Cadastrar([FromBody] Carro carro)
    {
        try
        {
            //Primeiro, procura-se no Banco de Dados o pátio com o id idêntico àquele fornecido no Body da requisição (carro.PatioId).
            Patio? patio = _context.Patios.Find(carro.PatioId);
            //Se o pátio é nulo, não existe. É interrompido o cadastro.
            if (patio == null)
            {
                return NotFound();
            }
            //Do contrário, segue-se para o cadastro dos dados fornecidos no corpo da requisição.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc
    //Aqui, todas as instâncias de carro são listadas...
    public IActionResult Listar()
    {
        try
        {
            //...trazendo de volta do banco de dados uma lista de carros, incluindo também a informação de seus respectivos pátios (Include)
            List<Carro> carros = _context.Carros.Include(c => c.Patio).ToList();
            //O retorno da lista carros tem a contagem = 0? Diga que não encontrou. Do contrário, exibir Ok(carros)
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //O método Buscar vai fazer uma procura a partir do id do carro fornecido na rota da requisição (FromRoute).
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            //Busca no banco de dados, através do context, a lista de carros (incluindo informações sobre seus respectivos pátios) e, dentro dela, traz o carro em que o id fornecido na rota é o mesmo daquele encontrado na lista.
            Carro? carroCadastrado = _context.Carros.Include(c => c.Patio).FirstOrDefault(c => c.CarroId == id);
            //Se o carro for diferente de nulo, ele existe. Entra na condição.
            if (carroCadastrado != null)
            {
                //Exibe o carro encontrado.
                return Ok(carroCadastrado);
            }
            //Do contrário, não-encontrado.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //Para alterar dados do carro, o método vai referenciar esse com o id fornecido na rota (FromRoute) e os novos dados no corpo da requisição (FromBody).
    public IActionResult Alterar([FromRoute] int id, [FromBody] Carro carro)
    {
        try
        {
            //Procura-se o carro dentro do Banco de Dados, onde o id fornecido é o mesmo do carro encontrado.
            Carro? carroCadastrado = _context.Carros.FirstOrDefault(c => c.CarroId == id);
            
            //Se o carro não é nulo, ele existe. Entra na condição.
            if (carroCadastrado != null)
            {
                //Procura-se a existência do pátio fornecido nos dados do carro no Body da requisição
                Patio? patio = _context.Patios.Find(carro.PatioId);
                //Se o pátio for nulo, ele não existe.
                if (patio == null)
                {
                    //Retorna Não-encontrado.
                    return NotFound();
                }
                //Do contrário, prossegue-se com o cadastramento  dos dados fornecidos no Body.
                carroCadastrado.Patio = patio;
                carroCadastrado.Marca = carro.Marca;
                carroCadastrado.Modelo = carro.Modelo;
                carroCadastrado.Placa = carro.Placa;
                //Tabela de Carros é devidamente atualizada e salva.
                _context.Carros.Update(carroCadastrado);
                _context.SaveChanges();
                return Ok();
            }
            //Caso o pátio seja nulo, retorna não-encontrado.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc
    //No método Deletar, procura-se o carro a partir de id fornecido na rota (FromRoute).
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            //Encontra e aloca para dentro de carroCadastrado o carro dentro do Banco de Dados que tenha o mesmo id daquele fornecido na rota.
            Carro? carroCadastrado = _context.Carros.Find(id);
            //Se o carro for diferente de nulo, ele existe. Entra na condição.
            if (carroCadastrado != null)
            {
               //O carro em questão é removido do banco de dados e tem essa alteração devidamente salva.
                _context.Carros.Remove(carroCadastrado);
                _context.SaveChanges();
                //Retorna lista de carros (agora sem aquele excluído) incluindo dados de pátio de cada carro.
                return Ok(_context.Carros.Include(c => c.Patio).ToList());
            }
            //Caso o carro seja igual a nulo, ele retorna não-encontrado.
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET: api/carro/porPatio/{patioId}
    [HttpGet]
    [Route("porPatio/{patioId}")]
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc
    //Este método GetByPatio serve para listar todos os carro em um pátio específico, nesse caso, aquele com o id fornecido na rota.
    public IActionResult GetByPatio([FromRoute] int patioId)
    {
        //Traz para a variável carros todos os carros do Banco de Dados onde o PatioId do carro seja idêntico ao patioId da requisição.
        var carros = _context.Carros.Where(c => c.PatioId == patioId).ToList();
        return Ok(carros);
    }

}
