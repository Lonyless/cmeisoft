export class Bairro {

    constructor(nome: string, cidadeId: number, id?: number,) {
        this.id = id
        this.nome = nome
        this.cidadeId = cidadeId
    }

    id?: number
    nome: string
    cidadeId: number

}