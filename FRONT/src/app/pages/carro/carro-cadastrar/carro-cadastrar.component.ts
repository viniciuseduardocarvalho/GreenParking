//Cliente Http do Angular responsável por fazer requisições.
import { HttpClient } from "@angular/common/http";
//Responsável por definir um componente em Angular.
import { Component } from "@angular/core";
//Serviço para o envio de mensagens snack bar.
import { MatSnackBar } from "@angular/material/snack-bar";
//Serviço Angular para navegar entre views.
import { Router } from "@angular/router";
//Os modelos das classes Pátio e Carro.
import { Patio } from "../../../models/patio.model";
import { Carro } from "../../../models/carro.model";

@Component({
	selector: "app-carro-cadastrar",
	templateUrl: "./carro-cadastrar.component.html",
	styleUrls: ["./carro-cadastrar.component.css"],
})

//Declaração das propriedades de classe para o formulário CarroCadastrar
export class CarroCadastrarComponent {
	marca: string = "";
	modelo: string = "";
	placa: string = "";
	patioId: number = 0;
	patios: Patio[] = [];

	//Serviços: HttpClient para realizar requisições HTTP, Router para navegação e MatSnackBar para exibição de notificações.
	constructor(
		private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar
  	) {}

	//Quando a página é iniciada (chamada), ela já invoca o ngOnInit abaixo:
	ngOnInit(): void {
		this.client
    	.get<Patio[]>("https://localhost:7273/api/patio/listar")
    	.subscribe({
    		//A requição funcionou
    		next: (patios) => {
    			console.table(patios);
        		this.patios = patios;
    		},
    		//A requição não funcionou
    		error: (erro) => {
        		console.log(erro);
    		},
    	});
	}

	cadastrar(): void {
		let carro: Carro = {
    		marca: this.marca,
      		modelo: this.modelo,
      		placa: this.placa,
      		patioId: this.patioId,
    	};

    	this.client
      	.post<Carro>(
        	"https://localhost:7273/api/carro/cadastrar",
        	carro
      	)
      	.subscribe({
        	//A requição funcionou
        	next: (carro) => {
          		this.snackBar.open(
            	"Carro cadastrado com sucesso!!",
            	"Green Parking",
            	{
              		duration: 1500,
            		horizontalPosition: "right",
              		verticalPosition: "top",
            	}
          		);
          		this.router.navigate(["pages/carro/listar"]);
        	},
        	//A requição não funcionou
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}
}
