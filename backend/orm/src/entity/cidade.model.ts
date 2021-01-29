import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

@Entity()
export class Cidade {

    constructor(nome?: string, id?: number) {
        this.id = id
        this.nome = nome
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string
    
}