//Este é o documento modelo da classe independente de um projeto.

/* namespace é uma maneira de organizar elementos comuns de um projeto.
Não necessariamente precisa ser o caminho de uma pasta ou arquivo.
Encare-o como um container para porções comuns ao projeto */
namespace API.Models;
public class Patio
{
    public Patio() => PatioCriadoEm = DateTime.Now;
    /* Aqui serão criados os atributos genéricos da classe.
    Os '?' depois do tipo de atributo implica que esse pode, sim, ser iniciado com valor nulo.
    Encaremos, aqui, como a definição de campos opcionais na hora do cadastro/instanciação. */
    public DateTime PatioCriadoEm { get; set; }
    public int PatioId { get; set; }
    public string? Nome { get; set; }
    public string? Endereco { get; set; }
    public int? QuantidadeVagas { get; set; }
}

/*Caso você precise que uma instância da classe seja sempre iniciada já com alguns valores definidos,
basta criar um construtor com esses atributos iniciados.

Exemplo:

    public Patio()
    {
        PatioString2 = "Não construído";
        PatioInt1 = 0;
    }
*/