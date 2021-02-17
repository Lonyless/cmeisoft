import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Cmei } from "./cmei.model";
import { Endereco } from "./endereco.model";
import { Responsavel } from "./responsavel.model";
import { CriancaAuxResponsavel } from "./responsavel_crianca";

@Entity() 
export class Crianca {

    constructor(sexo?: number, nascimento?: string, registro?: number, livro?: number,
        folha?: number, cpf?: number, endereco?: Endereco, cmeiOpcao1?: Cmei,
        cmeiOpcao2?: Cmei, status?: number, nome?: string, id?: number) {

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
    
    @OneToOne(type => Endereco)
    endereco: Endereco;

    @OneToOne(type => Cmei)
    cmeiOpcao1: Cmei;
    
    @OneToOne(type => Cmei)
    cmeiOpcao2: Cmei;
    
    @Column()
    status: number;
    
    @Column()
    nome: string;

    @OneToMany(type => CriancaAuxResponsavel, criancaAuxResponsavel => criancaAuxResponsavel.crianca)
    responsavelList: Responsavel[]
}