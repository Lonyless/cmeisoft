import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Criterio {

    constructor(descricao?: string, peso?: number, status?: number, id?: number) {
        this.descricao = descricao
        this.peso = peso
        this.status = status
        this.id = id
    }

    @Column()
    descricao: string
    
    @Column()
    peso: number
    
    @Column()
    status: number

    @PrimaryGeneratedColumn()
    id?: number

}