export class Cmei {

    constructor(id?: number, nome?: string, telefone?: number, idEndereco?: number, status?: number) {
        this.id = id
        this.nome = nome;
        this.telefone = telefone
        this.idEndereco = idEndereco
        this.status = status
    }

    id: number
    nome: string
    telefone: number
    idEndereco: number
    status: number

}