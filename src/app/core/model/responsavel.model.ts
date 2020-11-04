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

  id?: number;
  nome: string;
  cpf: number;
  telefone1: number;
  telefone2: number;
  trabalho: string;
  renda: number;
  pensao: number;
  numeroTitulo: number;
  zonaTitulo: number;
  secaoTitulo: number;
  status: number;
  tipo: string;
}
