import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Endereco } from "./endereco.model";

@Entity()
export class Cmei {

  constructor(
    nome?: string,
    telefone?: number,
    endereco?: Endereco,
    status?: number,
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.status = status;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: number;
 
  @OneToOne(type => Endereco, {cascade: true})
  @JoinColumn()
  endereco: Endereco;

  status: number;
}
