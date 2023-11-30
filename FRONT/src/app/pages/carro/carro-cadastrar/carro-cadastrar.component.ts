import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Patio } from "../../../models/patio.model";
import { Carro } from "../../../models/carro.model";

@Component({
	selector: "app-carro-cadastrar",
	templateUrl: "./carro-cadastrar.component.html",
	styleUrls: ["./carro-cadastrar.component.css"],
})

export class CarroCadastrarComponent {
	marca: string = "";
	modelo: string = "";
	placa: string = "";
	patioId: number = 0;
	patios: Patio[] = [];

	constructor(
		private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar
  	) {}

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
