import { Endereco } from "./endereco.model";

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

  id: number;

  nome: string;

  telefone: number;
 
  endereco: Endereco;

  status: number;
}
