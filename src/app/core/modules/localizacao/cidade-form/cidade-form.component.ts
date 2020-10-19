import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cidade } from 'src/app/core/model/cidade.model';
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

    let cidade = this.route.snapshot.data['cidade']
    cidade = [{ id: null, nome: '' }]
    //POG
    if (cidade[0] == null)
      cidade = [{ id: null, nome: '' }]

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [cidade[0].id],
      nomeCidade: [cidade[0].nome, [Validators.required]]
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
      const cidade = new Cidade(this.form.value.id, this.form.value.nome)

      //update
      console.log(this.form.value)
      this.cidadeService.alterar(cidade)

    } else {

      const cidade = new Cidade(this.form.value.nomeCidade)

      console.log(cidade)
      this.cidadeService.adicionar(cidade)
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
