import { Bairro } from "./bairro.model";

export class Endereco {

    constructor(id?: number, rua?: string, numero?: number, bairro?: Bairro) {
        this.id = id
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
    }

    id: number

    rua: string

    numero: number

    bairro: Bairro

}