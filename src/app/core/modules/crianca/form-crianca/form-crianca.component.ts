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
    this.enderecos = [];
    this.cmeiList = [];
    this.cmeiService = cmeiService;
    this.criancaService = criancaService;
    this.enderecoService = enderecoService;
  }

  //aqui eu chamo a funcao onSubmit la do component endereco, adicionando o endereco usando um evento
  //dessa funcao criar crianca.

  onFormSubmit() {
    this.onEnderecoSubmit();
  }

  onCriterioSubmit() {
    this.criterioEmmiterService.onEvent();
    this.onResponsavelSubmit();
  }

  onResponsavelSubmit() {
    this.responsavelEmmiterService.onEvent();
  }

  onEnderecoSubmit() {
    this.inEnderecoEmitterService.firstOnEvent();
  }

  cmeiList: Cmei[];

  ngOnInit(): void {
    if (this.inEnderecoEmitterService.secondSubsVar == undefined) {
      this.inEnderecoEmitterService.secondSubsVar = this.inEnderecoEmitterService.invokeSecondComponentFunction.subscribe(
        () => {
          // console.log('OUT');
          this.onSubmit();
        }
      );
    }

    this.cmeiService.listar().subscribe((res) => {
      this.cmeiList = res;
    }).unsubscribe;

    //let aluno = this.route.snapshot.data['aluno']
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

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
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

  enderecos: Endereco[];

  getEnderecoId() {
    this.enderecoService.listar().subscribe((res) => {
      this.enderecos = res;
    }).unsubscribe;
  }

  insertCrianca(enderecoId: number) {
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
    this.criancaService.adicionar(crianca);
  }

  async insertAuxCriterio() {
    this.criterioEmmiterService.onEvent();
  }

  async insertResponsavel() {
    this.responsavelEmmiterService.onEvent();
  }

  onSubmit() {
    //preciso emitir um evento no component endereco-form, esperar este evento ser completado
    //e DEPOIS chamar o evento insertCrianca

    //1

    //2
    this.enderecoService.listar().subscribe((enderecos) => {}).unsubscribe;
    //3
    //this.insertCrianca(enderecos[enderecos.length - 1].id).then(() => {});
    //4
    this.criancaService.listar().subscribe(() => {}).unsubscribe;
    //5
    this.insertAuxCriterio();
    //5
    this.insertResponsavel().then(() => {});
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
