export class Crianca {

    constructor(sexo?: number, nascimento?: string, registro?: number, livro?: number,
        folha?: number, cpf?: number, enderecoId?: number, cmeiOpcao1?: number,
        cmeiOpcao2?: number, status?: number, nome?: string, id?: number) {

        this.id = id;
        this.sexo = sexo;
        this.nascimento = nascimento;
        this.registro = registro;
        this.livro = livro;
        this.folha = folha;
        this.cpf = cpf;
        this.enderecoId = enderecoId;
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
    enderecoId: number;
    cmeiOpcao1: number;
    cmeiOpcao2: number;
    status: number;
    nome: string;

}