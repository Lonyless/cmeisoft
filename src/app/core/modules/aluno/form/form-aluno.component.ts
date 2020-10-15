import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { CriancaService } from '../../../services/crianca.service'

import { Crianca } from '../../../model/crianca.model'

@Component({
  selector: 'app-form-aluno',
  templateUrl: './form-aluno.component.html',
  styleUrls: ['./form-aluno.component.css']
})
export class FormAlunoComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public criancaService: CriancaService) {
    this.criancaService = criancaService
  }

  ngOnInit(): void  {

    let aluno = this.route.snapshot.data['aluno']

    //POG
    if (aluno[0] == null)
       aluno = [{id: null, nome: '', pai: '', contato_cell: '', contato_fixo: ''}]

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [aluno[0].id],
      nomeAluno: [aluno[0].nome, [Validators.required]],
      nomePai: [aluno[0].pai, [Validators.required]],
      nomeMae: [aluno[0].mae, [Validators.required]],
      contatoCell: [aluno[0].contato_cell, [Validators.required]],
      contatoFixo: [aluno[0].contato_fixo]
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
      const crianca = new Crianca(this.form.value.id, this.form.value.nomeAluno, this.form.value.nomePai,
        this.form.value.nomeMae, this.form.value.contatoCell, this.form.value.contatoFixo)

      //update
      console.log(this.form.value)
      this.criancaService.alterar(crianca)

    } else {

      const aluno = new Crianca(null, this.form.value.nomeAluno, this.form.value.nomePai,
        this.form.value.nomeMae, this.form.value.contatoCell, this.form.value.contatoFixo)

      console.log(aluno)
      this.criancaService.adicionar(aluno)
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
