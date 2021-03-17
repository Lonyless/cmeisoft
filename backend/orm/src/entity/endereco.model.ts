import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Bairro } from "./bairro.model";
import { Crianca } from "./crianca.model";

@Entity()
export class Endereco {

    constructor(rua?: string, numero?: number, bairro?: Bairro, id?: number) {
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

    @ManyToOne(type => Bairro, {cascade: true})
    bairro: Bairro

    @OneToOne(type => Crianca)
    crianca: Crianca
}