/* Declara-se a utilização do EntityFramework (mapeamento de objetos relacionais) e a referência ao container API.Data, 
onde estão localizadas informações referentes ao nosso AppDataContext.*/
using Microsoft.EntityFrameworkCore;
using API.Data;
using Microsoft.JSInterop.Infrastructure;

/* Cria-se uma instância do WebApplicationBuilder, utilizado para configurar a aplicação - faz parte do modelo de hospedagem simplificada introduzido no ASP.NET Core 6.*/
var builder = WebApplication.CreateBuilder(args);

// Add services to the container. = "Adicionar serviços ao container de injeção de dependências.
/* Adicionams aqui o nosso AppDataContext e o configuramos para usar o SQLite como provedor do banco de dados.
Damos ao nosso banco de dados o nome que quisermos. Nesse caso, optei pelo nome 'Patios&Carros'.*/
builder.Services.AddDbContext<AppDataContext>(
options => options.UseSqlite("Data Source=Patios&Carros.db;Cache=shared")
);

// Esse corpo do documento pode ser mantido sem alteração.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// * Sempre lembre de adicionar o Cors ao container de injeção de dependências. *
// Posicioná-lo depois da UseAuthorization e antes da MapControllers
app.UseCors
(
    c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
);

app.MapControllers();

app.Run();
