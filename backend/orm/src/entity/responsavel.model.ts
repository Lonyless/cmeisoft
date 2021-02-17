import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Crianca } from "./crianca.model";
import { CriancaAuxResponsavel } from "./responsavel_crianca";

@Entity()
export class Responsavel {
  constructor(
    nome?: string,
    cpf?: number,
    telefone1?: number,
    telefone2?: number,
    trabalho?: string,
    renda?: number,
    pensao?: number,
    numeroTitulo?: number,
    zonaTitulo?: number,
    secaoTitulo?: number,
    tipo?: string,
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone1 = telefone1;
    this.telefone2 = telefone2;
    this.trabalho = trabalho;
    this.renda = renda;
    this.pensao = pensao;
    this.numeroTitulo = numeroTitulo;
    this.zonaTitulo = zonaTitulo;
    this.secaoTitulo = secaoTitulo;
    this.tipo = tipo;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  cpf: number;

  @Column()
  telefone1: number;

  @Column()
  telefone2: number;

  @Column()
  trabalho: string;

  @Column()
  renda: number;

  @Column()
  pensao: number;

  @Column()
  numeroTitulo: number;

  @Column()
  zonaTitulo: number;

  @Column()
  secaoTitulo: number;

  @Column()
  status: number;

  @Column()
  tipo?: string;

  @OneToMany(type => CriancaAuxResponsavel, criancaAuxResponsavel => criancaAuxResponsavel.responsavel)
  criancaList: Crianca[]
}
