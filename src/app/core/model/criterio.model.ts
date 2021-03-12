
export class Criterio {

    constructor(descricao?: string, peso?: number, status?: number, id?: number) {
        this.descricao = descricao
        this.peso = peso
        this.status = status
        this.id = id
    }

    descricao: string
    
    peso: number
    
    status: number

    id?: number

}