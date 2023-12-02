//Cliente Http do Angular responsável por fazer requisições.
import { HttpClient } from "@angular/common/http";
//Responsável por definir um componente em Angular.
import { Component } from "@angular/core";
//Serviço para o envio de mensagens snack bar.
import { MatSnackBar } from "@angular/material/snack-bar";
//Os modelos das classes Pátio e Carro.
import { Patio } from "../../../models/patio.model";
import { Carro } from "../../../models/carro.model";

@Component({
	selector: "app-patio-listar",
  	templateUrl: "./patio-listar.component.html",
  	styleUrls: ["./patio-listar.component.css"],
})

export class PatioListarComponent {
  	colunasTabela: string[] = [
    	"id",
    	"nome",
    	"endereco",
		"quantidadeVagas",
		"alterar",
		"deletar",
  	];
  
	patios: Patio[] = [];

  	//Serviços: HttpClient para realizar requisições HTTP e MatSnackBar para exibição de notificações.
	constructor(
    	private client: HttpClient,
    	private snackBar: MatSnackBar
  	){
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  	}

  	//Quando a página é iniciada (chamada), ela já invoca o ngOnInit abaixo:
	ngOnInit(): void {
    	//Esse cliente Http busca um array de pátios através da rota api/patio/listar...
		this.client
      	.get<Patio[]>("https://localhost:7273/api/patio/listar")
      	.subscribe({
        	//Requisição com sucesso
			//...e se conseguir encontrar, exibe o array de pátios na forma de tabela.
        	next: (patios) => {
          		console.table(patios);
          		this.patios = patios;
        	},
        	//Requisição com erro
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}

  	//Método deletar: *Lembra-se da regra de negócio que pátio com carro estacionado nele não pode ser deletado.
	deletar(patioId: number) {
    	//Verifica se há carros associados ao pátio.
    	this.client
      	.get<Carro[]>(`https://localhost:7273/api/carro/porPatio/${patioId}`)
      	.subscribe({
        	next: (carros) => {
          		//Se a variável alocada carros existe e o tamanho dela é maior do que zero...
				if (carros && carros.length > 0) {
            	//...sinal de que há carros estacionados naquele pátio. Exibe mensagem de erro.
            		this.snackBar.open(
              			"Este pátio contém carros. Primeiro, remova ou mova os carros.",
              			"Green Parking",
            			{
            				duration: 3000,
                			horizontalPosition: "right",
                			verticalPosition: "top",
            			}
            		);
          		} 
				else {
            		// Do contrário, não há carros associados. Prosseguir com deleção.
            		this.client
              		.delete<Patio[]>(`https://localhost:7273/api/patio/deletar/${patioId}`)
              		.subscribe({
                		next: (patios) => {
                  			this.patios = patios;
                  			this.snackBar.open(
                    			"Patio deletado com sucesso!!",
                    			"Green Parking",
                    			{
                      				duration: 1500,
                      				horizontalPosition: "right",
                      				verticalPosition: "top",
                    			}
                  			);
                		},
                		error: (erro) => {
                  			console.log(erro);
                		},
              		});
          		}
        	},
        	error: (erro) => {
          		console.log(erro);
        	},
      	});
  	}
  
}
