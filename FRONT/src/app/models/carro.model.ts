//Importação do modelo da classe independente, pois ela é necessária para constituir atributos dentro desta classe aqui.
import { Patio } from "./patio.model";

//Aqui, temos a declaração dos atributos da classe que vamos, de alguma maneira, acessar e exibir no Frontend.
export interface Carro {
    carroCriadoEm?: string;
    carroId?: number;
    marca: string;
    modelo: string;
    placa: string;
    patioId: number;
    patio?: Patio;
}
