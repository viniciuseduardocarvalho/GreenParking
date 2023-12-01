//Utilizamos o Microsoft.AspNetCore.Mvc para a implementação do padrão arquitetural Model-View-Controller.
using Microsoft.AspNetCore.Mvc;
//Declaração das namespace que estamos utilizando, nesse caso aquilo referente a Models e Data (Banco de Dados).
using API.Data;
using API.Models;

namespace API.Controllers;

[ApiController]
[Route("api/patio")]
//public class PatioController herda do ControllerBase, classe base de controller encontrada dentro do AspNetCore.Mvc
public class PatioController : ControllerBase
{
    //Declaração de campo apenas para leitura do tipo AppDataContext nomeado _context (este realizará comunicação com o Banco de Dados).
    private readonly AppDataContext _context;

    public PatioController(AppDataContext context)
    {
        _context = context;
    }

    //POST: api/patio/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //Aqui, o método Cadastrar envia os dados do pátio a ser cadastrado a partir do corpo (FromBody) da requisição.
    public IActionResult Cadastrar([FromBody] Patio patio)
    {
        try
        {
            //Ele é devidamente adicionado ao Banco de Dados e salvo. Retorna criado.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc
    //Aqui, todas as instâncias de pátio são listadas...
    public IActionResult Listar()
    {
        try
        {
            //...trazendo de volta do Banco de Dados uma lista (List<Patio> patios).
            List<Patio> patios = _context.Patios.ToList();
            //O retorno da lista pátios tem a contagem = 0? Diga que não encontrou. Do contrário, exibir Ok(patios)
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //O método Buscar vai fazer uma procura a partir do id do pátio fornecido na rota da requisição (FromRoute).
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            //Busca no banco de dados, através do context, a lista de pátios e, dentro dela, traz o pátio em que o id fornecido na rota é o mesmo daquele encontrado na lista.
            Patio? patioCadastrado = _context.Patios.FirstOrDefault(p => p.PatioId == id);
            //Se o pátio for diferente de nulo, ele existe. Entra na condição.
            if (patioCadastrado != null)
            {
                //Retorna OK, exibe o patio encontrado.
                return Ok(patioCadastrado);
            }
            //Do contrário, não-encontrado.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc.
    //Para alterar dados do pátio, o método vai referenciar esse com o id fornecido na rota (FromRoute) e os novos dados no corpo da requisição (FromBody).
    public IActionResult Alterar([FromRoute] int id, [FromBody] Patio patio)
    {
        try
        {
            //Encontre a aloque para patioCadastrado o pátio dentro do Banco de Dados que tenha o mesmo id daquele fornecido na rota.
            Patio? patioCadastrado = _context.Patios.FirstOrDefault(p => p.PatioId == id);
            
            //Se pátio for diferente de nulo, ele existe. Entra na condição.
            if (patioCadastrado != null)
            {
                //Fornecimento dos dados alterados desse pátio em questão. Esses estão no corpo (body) da requisição.
                patioCadastrado.Nome = patio.Nome;
                patioCadastrado.Endereco = patio.Endereco;
                patioCadastrado.QuantidadeVagas = patio.QuantidadeVagas;
                //Atualiza e salva as alterações. Retorno OK.
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
    //Declaração do tipo de retorno IActionResult, retorno típico para métodos de controller dentro do AspNetCore.Mvc
    //No método Deletar, procura-se o pátio a partir de id fornecido na rota (FromRoute).
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            
            //Encontra e aloca para dentro de patioCadastrado o pátio dentro do Banco de Dados que tenha o mesmo id daquele fornecido na rota.
            Patio? patioCadastrado = _context.Patios.Find(id);
            //Se o pátio for diferente de nulo, ele existe. Entra na condição.
            if (patioCadastrado != null)
            {
                //Declaração booleana da existência (ou não) de carros estacionados naquele pátio dentro do Banco de Dados.
                bool possuiCarrosEstacionado = _context.Carros.Any(c => c.PatioId == id);
                //Se tiver carros estacionados naquele pátio (boolean == true)...
                if (possuiCarrosEstacionado)
                {
                    //...proíbe a deleção daquele pátio. Você deve primeiro deletar o carro ou mover o carro para outro pátio.
                    return BadRequest("Não é possível deletar esse pátio. Há carro(s) estacionado(s) nele.");
                }
                //Do contrário, não tendo carros estacionados nele (boolean == false), procede-se à deleção do pátio, removendo-o e salvando a alteração feita.
                _context.Patios.Remove(patioCadastrado);
                _context.SaveChanges();
                //Retorna a lista de pátios (agora sem aquele que foi excluído).
                return Ok(_context.Patios.ToList());
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
