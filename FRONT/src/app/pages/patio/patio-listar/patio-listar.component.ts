import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
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

  	constructor(
    	private client: HttpClient,
    	private snackBar: MatSnackBar
  	){
    //Um problema de CORS ao fazer uma requisição para a
    //nossa API
  	}

  	ngOnInit(): void {
    	this.client
      	.get<Patio[]>("https://localhost:7273/api/patio/listar")
      	.subscribe({
        	//Requisição com sucesso
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

  	deletar(patioId: number) {
    	// Check if there are associated cars
    	this.client
      	.get<Carro[]>(`https://localhost:7273/api/carro/porPatio/${patioId}`)
      	.subscribe({
        	next: (carros) => {
          		if (carros && carros.length > 0) {
            	// Associated cars found, display error message
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
            		// No associated cars, proceed with deletion
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
