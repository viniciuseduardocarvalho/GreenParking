import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Patio } from "../../../models/patio.model";

@Component({
	selector: "app-patio-cadastrar",
	templateUrl: "./patio-cadastrar.component.html",
  	styleUrls: ["./patio-cadastrar.component.css"],
})

export class PatioCadastrarComponent {
  	nome: string = "";
  	endereco: string = "";
  	quantidadeVagas: number | null = null;

  	constructor(
    	private client: HttpClient,
    	private router: Router,
    	private snackBar: MatSnackBar
  	) {}

  	ngOnInit(): void {}

  	cadastrar(): void {
    	let patio: Patio = {
      	nome: this.nome,
      	endereco: this.endereco,
      	quantidadeVagas: this.quantidadeVagas,
    	};

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
