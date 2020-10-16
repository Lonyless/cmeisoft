export class Bairro {

    constructor(id?: number, nome?: string, cidadeId?: number) {
        this.id = id
        this.nome = nome
        this.cidadeId = cidadeId
    }

    id: number
    nome: string
    cidadeId: number

}