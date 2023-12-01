/* Aqui, declara-se a utilização do EntityFramework (mapeamento de objetos relacionais) e a referência ao container API.Models, 
por estarmos usando as classes para criar tabelas num banco de dados.*/
using Microsoft.EntityFrameworkCore; 
using API.Models;

namespace API.Data;

/* Aqui, criamos a classe que chamamos de AppDataContext, a qual herda da classe DbContext. Leia: 'public class AppDataContext herda de DbContext.
DbContext é a classe fundamental dentro do Entity Framework Core que representa uma sessão com o banco de dados - permitindo acesso, consultas, alterações, etc.*/
public class AppDataContext : DbContext
{
    /* Construtor da nossa classe AppDataContext que pega uma instância de DbContextOptions<AppDataContext> como parâmetro.
    Sequencialmente, chama o construtor da DbContext e passa as recebidas 'options' para ele. 
    DbContextOptions determina as configurações de como a sessão com o banco de dados deve se comportar.*/
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options){}
    
    /* Declaração das classes que queremos que vire tabela no banco de dados - nesse caso, a tabela 'Patios' e a tabela 'Carros'.*/
    public DbSet<Patio> Patios { get; set; }
    public DbSet<Carro> Carros { get; set; }
}