import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bairro } from 'src/app/core/model/bairro.model';
import { Cidade } from 'src/app/core/model/cidade.model';
import { Crianca } from 'src/app/core/model/crianca.model';
import { Endereco } from 'src/app/core/model/endereco.model';
import { BairroService } from 'src/app/core/services/bairro.service';
import { CidadeService } from 'src/app/core/services/cidade.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder, private route: ActivatedRoute,
    public enderecoService: EnderecoService, public bairroService: BairroService,
    public cidadeService: CidadeService) {

    this.enderecoService = enderecoService
    this.bairroService = bairroService
    this.cidadeService = cidadeService

  }

  bairros: Bairro[];
  _visibilidade: boolean

  ngOnInit(): void {

    this._visibilidade = true

    this.bairroService.listar().subscribe(res => {
      this.bairros = res
    }).unsubscribe

    //let cmei = this.route.snapshot.data['cmei']
    let endereco = [{ id: null, rua: null, numero: null, bairroId: null }]

    //POG
    //if (cmei[0] == null)
    //endereco = [{ id: null, nome: '', telefone: '', idEndereco: '', status: null }]

    //cria o formulario de criar ou editar, com base no obj(se for nulo: criar)
    this.form = this.fb.group({
      id: [endereco[0].id],
      ruaEndereco: [endereco[0].rua, [Validators.required]],
      numeroEndereco: [endereco[0].numero, [Validators.required]],
      bairroId: [endereco[0].bairroId, [Validators.required]]
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

  refresh() {
    this.bairroService.listar().subscribe(res => {
      this.bairros = res
    }).unsubscribe
  }

  setar() {
    this.form.patchValue({ bairroId: this.bairros[this.bairros.length - 1].id })
  }

  visibilidade() {
    if (this._visibilidade) {
      this._visibilidade = false
    } else {
      this._visibilidade = true

    }
  }

  onSubmit() {

    if (this.form.value.id != null) {

      //criando um objeto com os valores do form, usei dois por causa do ID
      const endereco = new Endereco(this.form.value.id, this.form.value.ruaEndereco, this.form.value.numeroEndereco,
        this.form.value.bairroId)

      //update
      console.log(this.form.value)
      this.enderecoService.alterar(endereco)

    } else {

      const endereco = new Endereco(null, this.form.value.ruaEndereco, this.form.value.numeroEndereco,
        this.form.value.bairroId)

      console.log(endereco)
      this.enderecoService.adicionar(endereco)

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
