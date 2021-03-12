
import { Cidade } from "./cidade.model";


export class Bairro {

    constructor(nome: string, cidade: Cidade, id?: number,) {
        this.id = id
        this.nome = nome
        this.cidade = cidade
    }


    id: number


    nome: string


    cidade: Cidade

}