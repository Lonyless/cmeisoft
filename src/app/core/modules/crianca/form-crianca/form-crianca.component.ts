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
import { Responsavel } from 'src/app/core/model/responsavel.model';
import { Endereco } from 'src/app/core/model/endereco.model';

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
    private criterioEmmiterService: CriterioEmmiterService,
    private responsavelEmmiterService: ResponsavelEmmiterService
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

  refresh(): void {
    window.location.reload();
  }

  //cada vez que um responsavel é adicionado faz push na lista, usado para cadastrar -- 01/2020
  adicionarResponsavelLista(responsavelList: Responsavel[]) {

    this.responsavelList = responsavelList
 
    console.log(this.responsavelList)
  }

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

  responsavelList: Responsavel[] = [];

  idCrianca: number;
  crianca: Crianca;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      //buildando form de criterios

      //pega os dados que são passados pelo guard da rota, o criterio-guard.service
      //this.criterioList = this.route.snapshot.data.criterios.auxList;
      this.criterioList = this.route.snapshot.data.criterios;
      this.criterioAuxList = this.route.snapshot.data.aux;

      if (params['criancaId'] != null) {
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

      if (params['criancaId'] == null) {
        //parametro passado para o component de responsavel
        this.idCrianca = null;
      } else {
        //parametro passado para o component de responsavel
        this.idCrianca = params['criancaId'];

        this.criancaService
          .listarPorId(params['criancaId'])
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

    })
  }

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
        .listarPorId(crianca.endereco.id)
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
      cmeiOpcao1Crianca: [crianca.cmeiOpcao1.id, [Validators.required]],
      cmeiOpcao2Crianca: [crianca.cmeiOpcao2.id, [Validators.required]],
    });
    //--------------------------------------------
  }

  onSubmit() {

    this.route.queryParams.subscribe(params => {

      const crianca = new Crianca(
        this.form.value.sexoCrianca,
        this.form.value.nascimentoCrianca,
        this.form.value.registroCrianca,
        this.form.value.livroCrianca,
        this.form.value.folhaCrianca,
        this.form.value.cpfCrianca,
        params['enderecoId'],
        this.form.value.cmeiOpcao1Crianca,
        this.form.value.cmeiOpcao2Crianca,
        1,
        this.form.value.nomeCrianca,
        params['criancaId']
      );

      const endereco = new Endereco(
        params['enderecoId'], 
        this.formEndereco.value.ruaEndereco,
        this.formEndereco.value.numeroEndereco,
        this.formEndereco.value.bairroId
      );

      this.criancaService.salvarTodos(crianca, endereco, this.responsavelList, this.criterioList)

    })
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
