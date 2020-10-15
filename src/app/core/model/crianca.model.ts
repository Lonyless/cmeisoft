export class Crianca {

    constructor(id?: number, sexo?: number, nascimento?: string, registro?: number, livro?: number,
        folha?: number, cpf?: number, enderecoId?: number, bairroId?: number, cmeiOpcao1?: number,
        cmeiOpcao2?: number, cidadeId?: number, status?: number, nome?: string) {

        this.id = id;
        this.sexo = sexo;
        this.nascimento = nascimento;
        this.registro = registro;
        this.livro = livro;
        this.folha = folha;
        this.cpf = cpf;
        this.enderecoId = enderecoId;
        this.bairroId = bairroId;
        this.cmeiOpcao1 = cmeiOpcao1;
        this.cmeiOpcao2 = cmeiOpcao2;
        this.cidadeId = cidadeId;
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
    enderecoId: number;
    bairroId: number;
    cmeiOpcao1: number;
    cmeiOpcao2: number;
    cidadeId: number;
    status: number;
    nome: string;

}