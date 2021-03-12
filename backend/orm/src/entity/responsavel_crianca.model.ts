import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Crianca } from "./crianca.model";
import { Responsavel } from "./responsavel.model";

@Entity()
export class AuxCriancaResponsavel {

    constructor() {

    }

    @Column()
    tipo: String

    @ManyToOne(type => Crianca, crianca => crianca.responsavelList, { primary: true})
    crianca: Crianca;
    @ManyToOne(type => Responsavel, responsavel => responsavel.criancaList, { primary: true })
    responsavel: Responsavel;

}