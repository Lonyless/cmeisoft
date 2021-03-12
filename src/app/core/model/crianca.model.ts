import { Cmei } from "./cmei.model";
import { Criterio } from "./criterio.model";
import { Endereco } from "./endereco.model";
import { Responsavel } from "./responsavel.model";
import { AuxCriancaResponsavel } from "./responsavel_crianca.model";

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

    id?: number;

    sexo: number;
    
    nascimento: string;
    
    registro: number;
    
    livro: number;
    
    folha: number;
    
    cpf: number;
    
    endereco: Endereco;

    cmeiOpcao1: Cmei;
    
    cmeiOpcao2: Cmei;
    
    status: number;
    
    nome: string;

    criterioList: Criterio[]

    responsavelList: Responsavel[]
}