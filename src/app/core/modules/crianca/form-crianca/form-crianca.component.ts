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
import { Endereco } from 'src/app/core/model/endereco.model';
import { EnderecoFormComponent } from '../../localizacao/endereco-form/endereco-form.component';
import { EnderecoEmmiterService } from 'src/app/core/services/endereco-emmiter.service';
import { CriterioEmmiterService } from 'src/app/core/services/criterio-emmiter.service';
import { ResponsavelEmmiterService } from 'src/app/core/services/responsavel-emmiter.service';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';
import { Criterio } from 'src/app/core/model/criterio.model';
import { CriterioService } from 'src/app/core/services/criterioservice';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';

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
    private responsavelService: ResponsavelService
  ) {
    this.cmeiList = [];
    this.cmeiService = cmeiService;
    this.criancaService = criancaService;
    this.enderecoService = enderecoService;
  }

  formEndereco: FormGroup;
  formCriterio: FormGroup;

  criterioList: Criterio[];

  buildFormArray() {
    const values = this.criterioList.map((val) => new FormControl(false));

    return this.fb.array(values);
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
  insertEndereco() {
    this.inEnderecoEmitterService.firstOnEvent();
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
        this.form.value.nomeCrianca
      );
      console.log(crianca);
      console.log('enderecoID: ' + enderecoId);
      this.criancaService.adicionar(crianca).subscribe((resposta) => {
        console.log(resposta);
        this.insertAuxCriterio();
        this.insertAuxResponsavel();
      }).unsubscribe;
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
    this.responsavelEmmiterService.firstOnEvent();
  }

  ngOnInit(): void {
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
    this.criterioList = this.route.snapshot.data.criterios;

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
    if (this.route.snapshot.params['id'] == null) {
      this.buildFormCrianca([new Crianca()]);
    } else {
      this.criancaService
        .listarPorId(this.route.snapshot.params['id'])
        .subscribe((res) => {
          this.buildFormCrianca(res);
          console.log(res);
        }).unsubscribe;
    }
    //-------------------------------

    //criando o formulario de enderecos
    let endereco = [{ id: null, rua: null, numero: null, bairroId: null }];

    this.formEndereco = this.fb.group({
      id: [endereco[0].id],
      ruaEndereco: [endereco[0].rua, [Validators.required]],
      numeroEndereco: [endereco[0].numero, [Validators.required]],
      bairroId: [endereco[0].bairroId, [Validators.required]],
    });
    //----------------------------------
  }

  buildFormCrianca(crianca) {
    //todo
    this.responsavelService.listarCriancas(crianca.id).subscribe()

    //cria o formulario de criar ou editar criança
    this.form = this.fb.group({
      id: [crianca[0].id],
      nomeCrianca: [crianca[0].nome, [Validators.required]],
      sexoCrianca: [crianca[0].sexo, [Validators.required]],
      nascimentoCrianca: [crianca[0].nascimento, [Validators.required]],
      registroCrianca: [crianca[0].registro, [Validators.required]],
      livroCrianca: [crianca[0].livro, [Validators.required]],
      folhaCrianca: [crianca[0].folha, [Validators.required]],
      cpfCrianca: [crianca[0].cpf, [Validators.required]],
      cmeiOpcao1Crianca: [crianca[0].cmeiOpcao1, [Validators.required]],
      cmeiOpcao2Crianca: [crianca[0].cmeiOpcao2, [Validators.required]],
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
    this.insertEndereco();
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
    console.log(this.formEndereco);
  }
}
