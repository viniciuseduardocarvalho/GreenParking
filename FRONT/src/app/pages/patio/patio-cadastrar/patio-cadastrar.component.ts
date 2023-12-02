//Cliente Http do Angular responsável por fazer requisições.
import { HttpClient } from "@angular/common/http";
//Responsável por definir um componente em Angular.
import { Component } from "@angular/core";
//Serviço para o envio de mensagens snack bar.
import { MatSnackBar } from "@angular/material/snack-bar";
//Serviço Angular para navegar entre views.
import { Router } from "@angular/router";
//O modelo da classe Pátio.
import { Patio } from "../../../models/patio.model";

@Component({
	selector: "app-patio-cadastrar",
	templateUrl: "./patio-cadastrar.component.html",
  	styleUrls: ["./patio-cadastrar.component.css"],
})

//Declaração das propriedades de classe para o formulário PatioCadastrar
export class PatioCadastrarComponent {
  	nome: string = "";
  	endereco: string = "";
  	quantidadeVagas: number | null = null;

  	//Serviços: HttpClient para realizar requisições HTTP, Router para navegação e MatSnackBar para exibição de notificações.
	constructor(
    	private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar
  	) {}

  	ngOnInit(): void {}

  	//Método cadastrar
	cadastrar(): void {
    	//Declaração da variável local patio que recebe dados para os atributos a partir daquilo que é preenchido no formulário na página .html
		let patio: Patio = {
      	nome: this.nome,
      	endereco: this.endereco,
      	quantidadeVagas: this.quantidadeVagas,
    	};

    	//O cliente Http posta (salva) essa instância de pátio através da rota api/patio/cadastrar
		this.client
      	.post<Patio>(
        "https://localhost:7273/api/patio/cadastrar",
        patio
      	)
      	.subscribe({
        	//A requição funcionou
        	next: (patio) => {
          	this.snackBar.open(
            "Pátio cadastrado com sucesso!!",
            "Green Parking",
            {
              duration: 1500,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          	);
          	this.router.navigate(["pages/patio/listar"]);
        	},
        	//A requição não funcionou
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}
}
