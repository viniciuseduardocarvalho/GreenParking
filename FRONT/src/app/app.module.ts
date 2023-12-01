import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

//Importações de todos os elementos do Angular Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";

//Importação da Routing-module e AppComponent
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Importação de todas as components de Pátio e Carro
import { CarroCadastrarComponent } from "./pages/carro/carro-cadastrar/carro-cadastrar.component";
import { CarroListarComponent } from "./pages/carro/carro-listar/carro-listar.component";
import { CarroAlterarComponent } from './pages/carro/carro-alterar/carro-alterar.component';
import { PatioCadastrarComponent } from "./pages/patio/patio-cadastrar/patio-cadastrar.component";
import { PatioListarComponent } from "./pages/patio/patio-listar/patio-listar.component";
import { PatioAlterarComponent } from "./pages/patio/patio-alterar/patio-alterar.component";

@NgModule({
  	declarations: [
    	AppComponent,
    	CarroCadastrarComponent,
    	CarroListarComponent,
    	CarroAlterarComponent,
    	PatioCadastrarComponent,
    	PatioListarComponent,
    	PatioAlterarComponent,
  	],
  
	imports: [
    	BrowserModule,
    	AppRoutingModule,
    	HttpClientModule,
    	FormsModule,
    	BrowserAnimationsModule,
    	MatToolbarModule,
    	MatButtonModule,
    	MatIconModule,
    	MatSidenavModule,
    	MatListModule,
    	MatTableModule,
    	MatCardModule,
    	MatSelectModule,
    	MatInputModule,
    	MatFormFieldModule,
    	MatSnackBarModule,
  	],
  
	providers: [],
  	bootstrap: [AppComponent],
})

export class AppModule {}
