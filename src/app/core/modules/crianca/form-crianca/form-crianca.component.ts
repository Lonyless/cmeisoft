import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { CriancaService } from '../../../services/crianca.service'

import { Crianca } from '../../../model/crianca.model'

@Component({
  selector: 'app-form-crianca',
  templateUrl: './form-crianca.component.html',
  styleUrls: ['./form-crianca.component.css']
})
export class FormCriancaComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public criancaService: CriancaService) {
    this.criancaService = criancaService
  }

  ngOnInit(): void {

    //let aluno = this.route.snapshot.data['aluno']
    let crianca = [{
      id: null, sexo: 1, nascimento: null, registro: null, livro: "", folha: null, cpf: null,
      enderecoId: 1, bairroId: 1, cmeiOpcao1: 1, cmeiOpcao2: 1, cidadeId: 1, status: 1, nome: ""
    }]

    //POG
    //if (aluno[0] == null)
    //aluno = [{id: null, nome: '', pai: '', contato_cell: '', contato_fixo: ''}]

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
      enderecoIdCrianca: [crianca[0].enderecoId, [Validators.required]],
      bairroIdCrianca: [crianca[0].bairroId, [Validators.required]],
      cmeiOpcao1Crianca: [crianca[0].cmeiOpcao1, [Validators.required]],
      cmeiOpcao2Crianca: [crianca[0].cmeiOpcao2, [Validators.required]],
      cidadeIdCrianca: [crianca[0].cidadeId, [Validators.required]],
      statusCrianca: [crianca[0].status, [Validators.required]],
    })

    /*
    this.route.params.subscribe((params: any) => {
      const id = parseInt(params['id'])
      console.log(id)
      //dentro do observable que pega o id tem esse aqui q acha o aluno
      const aluno$ = this.alunoService.listarPorId(id)
      aluno$.subscribe( aluno => {
        this.updateForm(aluno)
      })
    })
    */
  }

  onSubmit() {

    if (this.form.value.id != null) {

      //criando um objeto com os valores do form, usei dois por causa do ID
      const crianca = new Crianca(this.form.value.id, this.form.value.sexoCrianca,
        this.form.value.nascimentoCrianca, this.form.value.registroCrianca, this.form.value.livroCrianca,
        this.form.value.folhaCrianca, this.form.value.cpfCrianca, this.form.value.enderecoIdCrianca,
        this.form.value.bairroIdCrianca, this.form.value.cmeiOpcao1Crianca, this.form.value.cmeiOpcao2Crianca,
        this.form.value.cidadeIdCrianca, this.form.value.statusCrianca, this.form.value.nomeCrianca)

      //update
      console.log(this.form.value)
      this.criancaService.alterar(crianca)

    } else {

      const crianca = new Crianca(this.form.value.sexoCrianca,
        this.form.value.nascimentoCrianca, this.form.value.registroCrianca, this.form.value.livroCrianca,
        this.form.value.folhaCrianca, this.form.value.cpfCrianca, this.form.value.enderecoIdCrianca,
        this.form.value.bairroIdCrianca, this.form.value.cmeiOpcao1Crianca, this.form.value.cmeiOpcao2Crianca,
        this.form.value.cidadeIdCrianca, this.form.value.statusCrianca, this.form.value.nomeCrianca)

      console.log(crianca)
      this.criancaService.adicionar(crianca)
    }
  }

  validarCampo(campo) {

    return !this.form.get(campo).valid && this.form.get(campo).touched

  }

  cssErro(campo) {
    return {
      'has-error': this.validarCampo(campo)
    }
  }

  tabErro(campo) {
    return {
      'dngr': this.validarCampo(campo)
    }
  }

  log() {
    console.log(this.form)
  }
}
