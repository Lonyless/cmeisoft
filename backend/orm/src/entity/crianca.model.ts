import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Cmei } from "./cmei.model";
import { Criterio } from "./criterio.model";
import { Endereco } from "./endereco.model";
import { Responsavel } from "./responsavel.model";
import { AuxCriancaResponsavel } from "./responsavel_crianca.model";

@Entity()
export class Crianca {

    constructor(nome?: string, sexo?: number, nascimento?: string, registro?: number, livro?: number,
        folha?: number, cpf?: number, endereco?: Endereco, cmeiOpcao1?: any,
        cmeiOpcao2?: any, criterioList?: Criterio[], status?: number, id?: number) {

        this.id = id;
        this.sexo = sexo;
        this.nascimento = nascimento;
        this.registro = registro;
        this.livro = livro;
        this.folha = folha;
        this.cpf = cpf;
        this.endereco = endereco;
        this.cmeiOpcao1 = cmeiOpcao1;
        this.cmeiOpcao2 = cmeiOpcao2;
        this.status = status;
        this.nome = nome;
        this.criterioList = criterioList

    }

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    sexo: number;

    @Column()
    nascimento: string;

    @Column()
    registro: number;

    @Column()
    livro: number;

    @Column()
    folha: number;

    @Column()
    cpf: number;

    @OneToOne(type => Endereco, endereco => endereco.crianca, { cascade: true, eager: true })
    @JoinColumn()
    endereco: Endereco;

    @ManyToOne(type => Cmei, { cascade: true })
    @JoinColumn()
    cmeiOpcao1: Cmei;

    @ManyToOne(type => Cmei, { cascade: true })
    @JoinColumn()
    cmeiOpcao2: Cmei;

    @Column()
    status: number;

    @Column()
    nome: string;

    @ManyToMany(() => Criterio)
    @JoinTable({ name: "aux_crianca_criterio" })
    criterioList: Criterio[]

    @OneToMany(type => AuxCriancaResponsavel, criancaAuxResponsavel => criancaAuxResponsavel.crianca)
    responsavelList: {}
}