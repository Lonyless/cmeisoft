export class Endereco {

    constructor(id?: number, rua?: string, numero?: number, bairroId?: number) {
        this.id = id
        this.rua = rua
        this.numero = numero
        this.bairroId = bairroId
    }

    id: number
    rua: string
    numero: number
    bairroId: number

}