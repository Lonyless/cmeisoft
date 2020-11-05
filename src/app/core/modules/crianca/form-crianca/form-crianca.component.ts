import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-crianca',
  templateUrl: './form-crianca.component.html',
  styleUrls: ['./form-crianca.component.css'],
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
    private inEnderecoEmitterService: EnderecoEmmiterService,
    private criterioEmmiterService: CriterioEmmiterService,
    private responsavelEmmiterService: ResponsavelEmmiterService
  ) {
    this.cmeiList = [];
    this.cmeiService = cmeiService;
    this.criancaService = criancaService;
    this.enderecoService = enderecoService;
  }

  cmeiList: Cmei[];

  onCriterioSubmit() {
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
      });
    }).unsubscribe;
  }

  //passo 3
  insertAuxCriterio() {
    this.criterioEmmiterService.onEvent();
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

    //ativa o evento do passo 5



    //alimenta o objeto Cmei
    this.cmeiService.listar().subscribe((res) => {
      this.cmeiList = res;
    }).unsubscribe;

    //cria um modelo default do objeto
    let crianca = [
      {
        id: null,
        sexo: null,
        nascimento: null,
        registro: null,
        livro: null,
        folha: null,
        cpf: null,
        enderecoId: null,
        cmeiOpcao1: null,
        cmeiOpcao2: null,
        cidadeId: null,
        status: null,
        nome: null,
      },
    ];

    //cria o formulario de criar ou editar
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
    console.log(this.form.value);
  }
}
