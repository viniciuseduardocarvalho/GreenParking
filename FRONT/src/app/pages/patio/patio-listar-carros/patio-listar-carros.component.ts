// patio-listar.component.ts
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Patio } from "../../../models/patio.model";
import { Carro } from "../../../models/carro.model";

@Component({
  selector: "app-patio-listar-carros",
  templateUrl: "./patio-listar-carros.component.html",
  styleUrls: ["./patio-listar-carros.component.css"],
})
export class PatioListarCarrosComponent implements OnInit {
  patios: (Patio & { carros?: Carro[] })[] = [];

  constructor(private client: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.client
      .get<Patio[]>("https://localhost:7273/api/patio/listar")
      .subscribe({
        next: (patios) => {
          this.patios = patios.map((patio) => ({ ...patio, carros: [] }));
          this.loadCarsForPatios();
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  loadCarsForPatios(): void {
    this.patios.forEach((patio) => {
      this.client
        .get<Carro[]>(`https://localhost:7273/api/carro/porPatio/${patio.patioId}`)
        .subscribe({
          next: (carros) => {
            patio.carros = carros;
          },
          error: (erro) => {
            console.log(erro);
          },
        });
    });
  }
}
