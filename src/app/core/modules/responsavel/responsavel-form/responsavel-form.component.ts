import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Responsavel } from 'src/app/core/model/responsavel.model';
import { ResponsavelEmmiterService } from 'src/app/core/services/responsavel-emmiter.service';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.css'],
})
export class ResponsavelFormComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public responsavelService: ResponsavelService
  ) {
    this.responsavelService = responsavelService;
  }

  form: FormGroup;

  @Output() adicionar = new EventEmitter();

  adicionarOnPressed() {
    const responsavel = new Responsavel(
      this.form.value.nomeResponsavel,
      this.form.value.cpfResponsavel,
      this.form.value.telefone1Responsavel,
      this.form.value.telefone2Responsavel,
      this.form.value.trabalhoResponsavel,
      this.form.value.rendaResponsavel,
      this.form.value.pensaoResponsavel,
      this.form.value.numeroTituloResponsavel,
      this.form.value.zonaTituloResponsavel,
      this.form.value.secaoTituloResponsavel,
      this.form.value.tipoResponsavel
    );

    this.onSubmit();
    this.adicionar.emit(responsavel);
    this.form.reset();
  }

  ngOnInit(): void {
    let responsavel = [
      {
        id: null,
        nome: null,
        cpf: null,
        telefone1: null,
        telefone2: null,
        trabalho: null,
        renda: null,
        pensao: null,
        numeroTitulo: null,
        zonaTitulo: null,
        secaoTitulo: null,
        status: null,
        tipo: null,
      },
    ];

    this.form = this.fb.group({
      id: [responsavel[0].id],
      nomeResponsavel: [responsavel[0].nome, [Validators.required]],
      cpfResponsavel: [responsavel[0].cpf, [Validators.required]],
      telefone1Responsavel: [responsavel[0].telefone1, [Validators.required]],
      telefone2Responsavel: [responsavel[0].telefone2, [Validators.required]],
      trabalhoResponsavel: [responsavel[0].trabalho, [Validators.required]],
      rendaResponsavel: [responsavel[0].renda, [Validators.required]],
      pensaoResponsavel: [responsavel[0].pensao, [Validators.required]],
      numeroTituloResponsavel: [
        responsavel[0].numeroTitulo,
        [Validators.required],
      ],
      zonaTituloResponsavel: [responsavel[0].zonaTitulo, [Validators.required]],
      secaoTituloResponsavel: [
        responsavel[0].secaoTitulo,
        [Validators.required],
      ],
      tipoResponsavel: [responsavel[0].tipo, [Validators.required]],
    });
  }

  @Output() adicionarAux = new EventEmitter();

  onSubmit() {
    const responsavel = new Responsavel(
      this.form.value.nomeResponsavel,
      this.form.value.cpfResponsavel,
      this.form.value.telefone1Responsavel,
      this.form.value.telefone2Responsavel,
      this.form.value.trabalhoResponsavel,
      this.form.value.rendaResponsavel,
      this.form.value.pensaoResponsavel,
      this.form.value.numeroTituloResponsavel,
      this.form.value.zonaTituloResponsavel,
      this.form.value.secaoTituloResponsavel,
      this.form.value.tipoResponsavel
    );

    const subs = this.responsavelService.adicionar(responsavel).subscribe(() => {
      subs.unsubscribe()
    })
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
    console.log(this.form);
  }
}
