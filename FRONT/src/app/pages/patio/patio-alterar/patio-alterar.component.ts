import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Patio } from "../../../models/patio.model";

@Component({
  	selector: "app-patio-alterar",
  	templateUrl: "./patio-alterar.component.html",
  	styleUrls: ["./patio-alterar.component.css"],
})

export class PatioAlterarComponent {
  	patioId: number = 0;
  	nome: string = "";
  	endereco: string = "";
	quantidadeVagas: number | null = null;

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
