import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//Importar as components de todas as páginas criadas que deseja acessar.
import { CarroListarComponent } from "./pages/carro/carro-listar/carro-listar.component";
import { CarroCadastrarComponent } from "./pages/carro/carro-cadastrar/carro-cadastrar.component";
import { CarroAlterarComponent } from "./pages/carro/carro-alterar/carro-alterar.component";
import { PatioListarComponent } from "./pages/patio/patio-listar/patio-listar.component";
import { PatioCadastrarComponent } from "./pages/patio/patio-cadastrar/patio-cadastrar.component";
import { PatioAlterarComponent } from "./pages/patio/patio-alterar/patio-alterar.component";
import { PatioListarCarrosComponent } from "./pages/patio/patio-listar-carros/patio-listar-carros.component";

// Aqui constam as rotas na URL da localhost e quais os respectivos Components que cada uma chama na aplicação.
const routes: Routes = [
	{
    	path: "",
    	component: PatioListarCarrosComponent,
  	},
  	{
    	path: "pages/carro/listar",
    	component: CarroListarComponent,
  	},
  	{
    	path: "pages/carro/cadastrar",
    	component: CarroCadastrarComponent,
  	},
  	{
    	path: "pages/carro/alterar/:id",
    	component: CarroAlterarComponent,
  	},
  	{
    	path: "pages/patio/listar",
    	component: PatioListarComponent,
  	},
  	{
    	path: "pages/patio/cadastrar",
    	component: PatioCadastrarComponent,
  	},
  	{
    	path: "pages/patio/alterar/:id",
    	component: PatioAlterarComponent,
  	},
	{
    	path: "pages/patio/listar-carros",
    	component: PatioListarCarrosComponent,
  	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule],
})

export class AppRoutingModule {}
