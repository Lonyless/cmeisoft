import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Bairro } from "./bairro.model";

@Entity()
export class Endereco {

    constructor(id?: number, rua?: string, numero?: number, bairro?: Bairro) {
        this.id = id
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rua: string

    @Column()
    numero: number

    @ManyToOne(type => Bairro)
    bairro: Bairro

}