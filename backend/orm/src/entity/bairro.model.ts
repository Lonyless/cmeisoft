import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Cidade } from "./cidade.model";

@Entity()
export class Bairro {

    constructor(nome: string, cidade: Cidade, id?: number,) {
        this.id = id
        this.nome = nome
        this.cidade = cidade
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @ManyToOne(type => Cidade)
    cidade: Cidade

}