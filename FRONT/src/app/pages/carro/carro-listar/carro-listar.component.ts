//Cliente Http do Angular responsável por fazer requisições.
import { HttpClient } from "@angular/common/http";
//Responsável por definir um componente em Angular.
import { Component } from "@angular/core";
//Serviço para o envio de mensagens snack bar.
import { MatSnackBar } from "@angular/material/snack-bar";
//O modelo da classe Carro.
import { Carro } from "../../../models/carro.model";

@Component({
  	selector: "app-carro-listar",
  	templateUrl: "./carro-listar.component.html",
  	styleUrls: ["./carro-listar.component.css"],
})

export class CarroListarComponent {
	colunasTabela: string[] = [
    	"id",
    	"marca",
    	"modelo",
    	"placa",
    	"patio",
		"alterar",
    	"deletar",
  	];
  	
	carros: Carro[] = [];

  	//Serviços: HttpClient para realizar requisições HTTP e MatSnackBar para exibição de notificações.
	constructor(
    	private client: HttpClient,
    	private snackBar: MatSnackBar
  	) {
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  	}

  	//Quando a página é iniciada (chamada), ela já invoca o ngOnInit abaixo:
	ngOnInit(): void {
    	this.client
      	.get<Carro[]>("https://localhost:7273/api/carro/listar")
      	.subscribe({
        	//Requisição com sucesso
        	next: (carros) => {
          		console.table(carros);
          		this.carros = carros;
        	},
        	//Requisição com erro
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}

  	deletar(carroId: number) {
    	this.client
      	.delete<Carro[]>(
        	`https://localhost:7273/api/carro/deletar/${carroId}`
      	)
      	.subscribe({
        	//Requisição com sucesso
        	next: (carros) => {
        		this.carros = carros;
          		this.snackBar.open(
            		"Carro deletado com sucesso!!",
            		"Green Parking",
            		{
            			duration: 1500,
              			horizontalPosition: "right",
              			verticalPosition: "top",
            		}
          		);
        	},
        	//Requisição com erro
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}
}
