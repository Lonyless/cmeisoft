export class Endereco {

    constructor(id?: number, rua?: string, numero?: number, idBairro?: number) {
        this.id = id
        this.rua = rua
        this.numero = numero
        this.idBairro = idBairro
    }

    id: number
    rua: string
    numero: number
    idBairro: number

}