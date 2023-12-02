//Cliente Http do Angular responsável por fazer requisições.
import { HttpClient } from "@angular/common/http";
//Responsável por definir um componente em Angular.
import { Component } from "@angular/core";
//Serviço para o envio de mensagens snack bar.
import { MatSnackBar } from "@angular/material/snack-bar";
//Serviço Angular para navegar entre views.
import { ActivatedRoute, Router } from "@angular/router";
//O modelo da classe Pátio.
import { Patio } from "../../../models/patio.model";

@Component({
  	selector: "app-patio-alterar",
  	templateUrl: "./patio-alterar.component.html",
  	styleUrls: ["./patio-alterar.component.css"],
})

//Declaração das propriedades de classe para o formulário PatioAlterar
export class PatioAlterarComponent {
  	patioId: number = 0;
  	nome: string = "";
  	endereco: string = "";
	quantidadeVagas: number | null = null;

  	//Serviços: HttpClient para realizar requisições HTTP, Router para navegação, MatSnackBar para exibição de notificações e .
	constructor(
    	private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar,
    	private route: ActivatedRoute
  	) {}

  	//Quando a página é iniciada (chamada), ela já invoca o ngOnInit abaixo:
	ngOnInit(): void {
    	this.route.params.subscribe({
      		next: (parametros) => {
        		let { id } = parametros;
        		this.client
          		.get<Patio>(
            		`https://localhost:7273/api/patio/buscar/${id}`
          		)
          		.subscribe({
            		next: (patio) => {
                    	this.patioId = patio.patioId!;
                    	this.nome = patio.nome;
                    	this.endereco = patio.endereco;
						this.quantidadeVagas = patio.quantidadeVagas;
                  	},
                  	error: (erro) => {
                    	console.log(erro);
                  	},
                });
            },
            //Requisição com erro
            error: (erro) => {
              	console.log(erro);
            },
    	});
  	}

  	alterar(): void {
    	let patio: Patio = {
      		nome: this.nome,
      		endereco: this.endereco,
			quantidadeVagas: this.quantidadeVagas,
    	};

    	console.log(patio);

    	this.client
      	.put<Patio>(
        	`https://localhost:7273/api/patio/alterar/${this.patioId}`,
        	patio
      	)
      	.subscribe({
        //A requição funcionou
        	next: (patio) => {
          		this.snackBar.open(
            		"Pátio alterado com sucesso!!",
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
