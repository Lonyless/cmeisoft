import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  Form,
  FormControl,
} from '@angular/forms';

import { CriancaService } from '../../../services/crianca.service';

import { Crianca } from '../../../model/crianca.model';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { EnderecoEmmiterService } from 'src/app/core/services/endereco-emmiter.service';
import { CriterioEmmiterService } from 'src/app/core/services/criterio-emmiter.service';
import { ResponsavelEmmiterService } from 'src/app/core/services/responsavel-emmiter.service';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';
import { Criterio } from 'src/app/core/model/criterio.model';
import { CriterioService } from 'src/app/core/services/criterioservice';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';
import { BairroService } from 'src/app/core/services/bairro.service';

@Component({
  selector: 'app-form-crianca',
  templateUrl: './form-crianca.component.html',
  styleUrls: ['./form-crianca.component.css'],
  providers: [EnderecoEmmiterService],
})
export class FormCriancaComponent implements OnInit {
  form: FormGroup;
  cidadeIdCrianca: number;
  visibilidade: boolean;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public criancaService: CriancaService,
    public enderecoService: EnderecoService,
    public cmeiService: CmeiService,
    public criterioService: CriterioService,
    private inEnderecoEmitterService: EnderecoEmmiterService,
    private criterioEmmiterService: CriterioEmmiterService,
    private responsavelEmmiterService: ResponsavelEmmiterService,
    private responsavelService: ResponsavelService,
    private bairroService: BairroService
  ) {
    this.criterioList = [];
    this.cmeiList = [];
    this.cmeiService = cmeiService;
    this.criancaService = criancaService;
    this.enderecoService = enderecoService;
  }

  formEndereco: FormGroup;
  formCriterio: FormGroup;
  formTipoResponsavel: FormGroup;

  criterioList: Criterio[];
  criterioAuxList: any;

  buildFormArray() {
    console.log(this.criterioList);
    let values;
    let flag;

    if (this.criterioAuxList != null) {
      values = this.criterioList.map((criterio) => {
        flag = false;
        this.criterioAuxList.forEach((crit) => {
          if (
            crit.crianca_id == this.idCrianca &&
            criterio.id == crit.criteriosocial_id
          ) {
            flag = true;
          }
        });

        return new FormControl(flag); //retorna para a variavel value
      });

      return this.fb.array(values);
    } else {
      values = this.criterioList.map((criterio) => new FormControl(false));
      console.log(values);
      return this.fb.array(values);
    }
  }

  cmeiList: Cmei[];

  onCriterioSubmit() {
    let valueSumbit = Object.assign({}, this.formCriterio.value);

    valueSumbit = Object.assign(valueSumbit, {
      criterios: valueSumbit.criterios
        .map((v, i) => (v ? this.criterioList[i] : null))
        .filter((v) => v != null),
    });

    console.log('SUBMIT: ' + valueSumbit);

    this.criterioEmmiterService.onEvent();
  }

  //passo 1
  insertEndereco(crianca) {
    this.inEnderecoEmitterService.firstOnEvent(crianca);
  }

  //passo 2
  insertCrianca() {
    this.enderecoService.listar().subscribe((enderecos) => {
      let enderecoId = enderecos[enderecos.length - 1].id;
      const crianca = new Crianca(
        this.form.value.sexoCrianca,
        this.form.value.nascimentoCrianca,
        this.form.value.registroCrianca,
        this.form.value.livroCrianca,
        this.form.value.folhaCrianca,
        this.form.value.cpfCrianca,
        enderecoId,
        this.form.value.cmeiOpcao1Crianca,
        this.form.value.cmeiOpcao2Crianca,
        1,
        this.form.value.nomeCrianca,
        this.route.snapshot.params['id']
      );

      //Update,
      if (this.route.snapshot.params['id'] != null) {
        this.criancaService.alterar(crianca).subscribe((resposta) => {
          console.log(resposta);
          this.insertAuxCriterio();
          this.insertAuxResponsavel();
        }).unsubscribe;
        //Create
      } else {
        this.criancaService.adicionar(crianca).subscribe((resposta) => {
          console.log(resposta);
          this.insertAuxCriterio();
          this.insertAuxResponsavel();
        }).unsubscribe;
      }
    }).unsubscribe;
  }

  //passo 3
  insertAuxCriterio() {
    //atribuindo os criterios a um objeto
    let valueSumbit = Object.assign({}, this.formCriterio.value);

    //mapeando os objetos: retorna uma lista apenas com os criterios selecionados
    valueSumbit = Object.assign(valueSumbit, {
      criterios: valueSumbit.criterios
        .map((v, i) => (v ? this.criterioList[i] : null))
        .filter((v) => v != null),
    });

    if (this.route.snapshot.params['id'] != null) {
      this.criterioService
        .deletarAux(this.route.snapshot.params['id'])
        .subscribe(() => {});
    }

    //lista as crianças, percorre o vetor e adiciona os criterios na tabela auxiliar
    this.criancaService.listar().subscribe((crianca) => {
      valueSumbit.criterios.forEach((criterio: Criterio) => {
        this.criterioService.adicionarAux(
          criterio,
          crianca[crianca.length - 1]
        );
      });
    }).unsubscribe;
  }

  //passo 4
  insertAuxResponsavel() {
    this.responsavelEmmiterService.firstOnEvent(this.crianca);
  }

  idCrianca: number;
  crianca: Crianca;

  ngOnInit(): void {
    this.idCrianca = this.route.snapshot.params['id'];
    //ativa o evento do passo 2
    if (this.inEnderecoEmitterService.secondSubsVar == undefined) {
      this.inEnderecoEmitterService.secondSubsVar = this.inEnderecoEmitterService.invokeSecondComponentFunction.subscribe(
        () => {
          this.insertCrianca();
        }
      );
    }
    //-------------------------

    //buildando form de criterios

    //pega os dados que são passados pelo guard da rota, o criterio-guard.service
    //this.criterioList = this.route.snapshot.data.criterios.auxList;
    this.criterioList = this.route.snapshot.data.criterios;
    this.criterioAuxList = this.route.snapshot.data.aux;

    if (this.route.snapshot.params['id'] != null) {
      this.formCriterio = this.fb.group({
        criterios: this.buildFormArray(),
      });
    } else {
      this.formCriterio = this.fb.group({
        criterios: this.buildFormArray(),
      });
    }

    this.formCriterio = this.fb.group({
      criterios: this.buildFormArray(),
    });
    //---------------------------------------------------------------------------

    //alimenta o objeto Cmei
    this.cmeiService.listar().subscribe((res) => {
      this.cmeiList = res;
    }).unsubscribe;
    //----------------------

    /* 
    criando um modelo default do objeto

    se a rota possuir um parametro de id (id==null) sera criado um form vazio, 
    se possuir o parametro (id!=null) o form sera abastecido com os valores 
    de um listarPorId com o id passado pela rota
    */

    //chamo pra instanciar o form, é necessario pq o else chama essa função porem de forma assincrona, causando erro
    //ao renderizar a page. chamando antes ele renderiza o form vazio e DEPOIS atribui valores se houver params['id']
    this.buildFormCrianca(new Crianca(), 1);

    if (this.route.snapshot.params['id'] == null) {
      //parametro passado para o component de responsavel
      this.idCrianca = null;
    } else {
      //parametro passado para o component de responsavel
      this.idCrianca = this.route.snapshot.params['id'];

      this.criancaService
        .listarPorId(this.route.snapshot.params['id'])
        .subscribe((res) => {
          this.enderecoService.listar().subscribe((enderecoList) => {
            enderecoList.filter((endereco) => {
              //alterando data pra remover o fuso horario
              let nascimento = res[0].nascimento.slice(0, 10);

              this.crianca = new Crianca(
                res[0].sexo,
                nascimento,
                res[0].registro,
                res[0].livro,
                res[0].folha,
                res[0].cpf,
                res[0].endereco_id,
                res[0].cmei_opcao1,
                res[0].cmei_opcao2,
                res[0].status,
                res[0].nome,
                res[0].id
              );
              endereco.id == res[0].endereco_id
                ? this.buildFormCrianca(this.crianca, 2)
                : null;
            });
          }).unsubscribe;
        }).unsubscribe;
    }

    //-------------------------------

    //criando o formulario de enderecos

    //----------------------------------
  }

  checkSeleceted(criterio) {}

  buildFormCrianca(crianca: Crianca, op, enderecoId?) {
    this.formEndereco = this.fb.group({
      id: [],
      ruaEndereco: ['', [Validators.required]],
      numeroEndereco: ['', [Validators.required]],
      bairroId: ['', [Validators.required]],
    });

    //op == 1: create / op == 2: update

    if (op == 2) {
      console.log(crianca);
      this.enderecoService
        .listarPorId(crianca.enderecoId)
        .subscribe((endereco) => {
          this.formEndereco = this.fb.group({
            id: [endereco[0].id],
            ruaEndereco: [endereco[0].rua, [Validators.required]],
            numeroEndereco: [endereco[0].numero, [Validators.required]],
            bairroId: [endereco[0].bairro_id, [Validators.required]],
          });

          /* this.bairroService.listar().subscribe((bairroList) => {
            let selectedBairro = bairroList.filter(
              (bairro) => bairro.id == endereco[0].bairro_id
            );
         
            this.formEndereco = this.fb.group({
              id: [endereco[0].id],
              ruaEndereco: [endereco[0].rua, [Validators.required]],
              numeroEndereco: [endereco[0].numero, [Validators.required]],
              bairroId: [selectedBairro[0].id, [Validators.required]],
            });
          });*/
        }).unsubscribe;
    }

    //cria o formulario de criar ou editar criança
    this.form = this.fb.group({
      id: [crianca.id],
      nomeCrianca: [crianca.nome, [Validators.required]],
      sexoCrianca: [crianca.sexo, [Validators.required]],
      nascimentoCrianca: [crianca.nascimento, [Validators.required]],
      registroCrianca: [crianca.registro, [Validators.required]],
      livroCrianca: [crianca.livro, [Validators.required]],
      folhaCrianca: [crianca.folha, [Validators.required]],
      cpfCrianca: [crianca.cpf, [Validators.required]],
      cmeiOpcao1Crianca: [crianca.cmeiOpcao1, [Validators.required]],
      cmeiOpcao2Crianca: [crianca.cmeiOpcao2, [Validators.required]],
    });
    //--------------------------------------------
  }

  onSubmit() {
    //rotina de insert
    /*
    1 - ENDERECO
    2 - CRIANCA
    3 - AUX-CRIANCA-CRITERIO
    4 - RESPONSAVEL
    5 - AUX-CRIANCA-RESPONSAVEL

    botao chama onSubmit(), que chama o insertEndereco(). quando o endereco-form termina a inserção ele 
    dispara o inEnderecoEmitterService, que chama o insertCrianca(). quando a subscription do insertCrianca
    termina ele chama o insertResponsavel() e insertAuxCriterio()
    */

    //verifica se é um update ou create

    this.insertEndereco(this.crianca);
  }

  //validações e css
  validarCampo(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  cssErro(campo) {
    return {
      'has-error': this.validarCampo(campo),
    };
  }

  tabErro(campo) {
    return {
      dngr: this.validarCampo(campo),
    };
  }

  log() {
    console.log(this.formTipoResponsavel);
  }
}
