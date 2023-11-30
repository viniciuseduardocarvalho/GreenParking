//Este é o documento modelo da classe dependente de outra(s) classe(s).

//Perceba que aqui não precisamos fazer o import da classe independente, por estarmos usando o mesmo namespace.
namespace API.Models;
public class Carro
{
    public Carro() => CarroCriadoEm = DateTime.Now;
    /* Aqui serão criados os atributos genéricos da classe + inclusão da outra classe.
    Os '?' depois do tipo de atributo implica que esse pode, sim, ser iniciado com valor nulo.
    Encaremos, aqui, como a definição de campos opcionais na hora do cadastro/instanciação.*/
    public DateTime CarroCriadoEm { get; set; }
    public int CarroId { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public string? Placa { get; set; }
    public Patio? Patio { get; set; }
    public int PatioId { get; set; }
}

/*Caso você precise que uma instância da classe seja sempre iniciada já com alguns valores definidos,
basta criar um construtor com esses atributos iniciados.

Exemplo:

    public Carro()
    {
        CarroString2 = "habilitado";
        CarroInt1 = 0;
    }
*/