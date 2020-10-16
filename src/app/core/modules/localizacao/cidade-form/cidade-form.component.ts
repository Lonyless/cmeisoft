import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CidadeService } from 'src/app/core/services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public cidadeService: CidadeService) {

    this.cidadeService = cidadeService

  }

  ngOnInit(): void {

    let cmei = this.route.snapshot.data['cidade']

    //POG
    if (cmei[0] == null)
      cmei = [{ id: null, nome: '', telefone: '', idEndereco: '', status: null }]

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [cmei[0].id],
      nomeAluno: [cmei[0].nome, [Validators.required]],
      nomePai: [cmei[0].pai, [Validators.required]],
      nomeMae: [cmei[0].mae, [Validators.required]],
      contatoCell: [cmei[0].contato_cell, [Validators.required]],
      contatoFixo: [cmei[0].contato_fixo]
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
