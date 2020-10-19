import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bairro } from 'src/app/core/model/bairro.model';
import { Cidade } from 'src/app/core/model/cidade.model';
import { BairroService } from 'src/app/core/services/bairro.service';
import { CidadeService } from 'src/app/core/services/cidade.service';

@Component({
  selector: 'app-bairro-form',
  templateUrl: './bairro-form.component.html',
  styleUrls: ['./bairro-form.component.css']
})
export class BairroFormComponent implements OnInit {

  form: FormGroup;

  cidades: Cidade[];

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public cidadeService: CidadeService,
    public bairroService: BairroService) {

    this.cidadeService = cidadeService
    this.bairroService = bairroService

  }

  ngOnInit(): void {

    this.cidadeService.listar().subscribe(res => {
      this.cidades = res
    })

    //let bairro = this.route.snapshot.data['bairro']
    let bairro = [{id: null, nome: '', cidadeId: null }]

    /*
    //POG
    if (bairro[0] == null)
      bairro = [{ id: null, nome: '', cidadeId: null }]
    */
   
    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [bairro[0].id],
      nomeBairro: [bairro[0].nome, [Validators.required]],
      nomeCidade: [bairro[0].cidadeId, [Validators.required]]
    })
  }

  onSubmit() {

    if (this.form.value.id != null) {

      //criando um objeto com os valores do form, usei dois por causa do ID
      const bairro = new Bairro(this.form.value.nomeBairro, this.form.value.nomeCidade)

      //update
      console.log(this.form.value)
      this.bairroService.alterar(bairro)

    } else {

      const bairro = new Bairro(this.form.value.nomeBairro, this.form.value.nomeCidade)

      console.log(bairro)
      this.bairroService.adicionar(bairro)
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
