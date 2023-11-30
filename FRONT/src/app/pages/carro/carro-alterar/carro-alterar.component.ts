import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Patio } from "../../../models/patio.model";
import { Carro } from "../../../models/carro.model";

@Component({
	selector: "app-carro-alterar",
  	templateUrl: "./carro-alterar.component.html",
  	styleUrls: ["./carro-alterar.component.css"],
})

export class CarroAlterarComponent {
	carroId: number = 0;
  	marca: string = "";
  	modelo: string = "";
  	placa: string = "";
  	patioId: number = 0;
  	patios: Patio[] = [];

	constructor(
    	private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar,
    	private route: ActivatedRoute
  	) {}

  	ngOnInit(): void {
    	this.route.params.subscribe({
      		next: (parametros) => {
        		let { id } = parametros;
        		this.client
          		.get<Carro>(
            		`https://localhost:7273/api/carro/buscar/${id}`
          		)
          		.subscribe({
            		next: (carro) => {
              			this.client
                		.get<Patio[]>(
                  			"https://localhost:7273/api/patio/listar"
                		)
                		.subscribe({
                  			next: (patios) => {
                    			this.patios = patios;
                    			this.carroId = carro.carroId!;
                    			this.marca = carro.marca;
                    			this.modelo = carro.modelo;
                    			this.placa = carro.placa;
                    			this.patioId = carro.patioId;
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
      		},
    	});
  	}

  	alterar(): void {
    	let carro: Carro = {
      		marca: this.marca,
      		modelo: this.modelo,
      		placa: this.placa,
      		patioId: this.patioId,
    	};

    	console.log(carro);

    	this.client
      	.put<Carro>(
        	`https://localhost:7273/api/carro/alterar/${this.carroId}`,
        	carro
      	)
      	.subscribe({
        	//A requição funcionou
        	next: (carro) => {
          		this.snackBar.open(
            		"Carro alterado com sucesso!!",
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
