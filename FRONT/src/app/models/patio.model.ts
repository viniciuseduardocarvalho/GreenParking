//Aqui, temos a declaração dos atributos da classe que vamos, de alguma maneira, acessar e exibir no Frontend.
export interface Patio {
    patioCriadoEm?: string;
    patioId?: number;
    nome: string;
    endereco: string;
    quantidadeVagas: number | null;
}