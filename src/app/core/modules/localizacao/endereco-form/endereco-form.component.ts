import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Bairro } from 'src/app/core/model/bairro.model';
import { Endereco } from 'src/app/core/model/endereco.model';
import { BairroService } from 'src/app/core/services/bairro.service';
import { CidadeService } from 'src/app/core/services/cidade.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { EnderecoEmmiterService } from 'src/app/core/services/endereco-emmiter.service';
import { nextTick } from 'process';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css'],
})
export class EnderecoFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  @Output() enderecoEmmiter = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public enderecoService: EnderecoService,
    public bairroService: BairroService,
    public cidadeService: CidadeService,
    private inEventEmitterService: EnderecoEmmiterService
  ) {
    this.enderecoService = enderecoService;
    this.bairroService = bairroService;
    this.cidadeService = cidadeService;
  }

  bairros: Bairro[];
  _visibilidade: boolean;

  ngOnInit(): void {

    this._visibilidade = true;

    this.bairroService.listar().subscribe((res) => {
      this.bairros = res;
    }).unsubscribe;
  }

  ngOnDestroy() { }

  setar() {
    this.bairroService.listar().subscribe((res) => {
      (this.bairros = res),
        this.form.patchValue({
          bairroId: this.bairros[this.bairros.length - 1].id,
        });
    }).unsubscribe;
  }

  onSubmit(crianca) {

    const endereco = new Endereco(
      null,
      this.form.value.ruaEndereco,
      this.form.value.numeroEndereco,
      this.form.value.bairroId
    );

    //this.enderecoEmmiter.emit(endereco);
    /*------------------------------- pra baixo é old
    if (this.route.snapshot.params['id'] == null) {
      this.enderecoService.adicionar(endereco).subscribe(
        (sucesso) => {
          this.inEventEmitterService.secondOnEvent();
          console.log(sucesso);
        },
        (erro) => {
          console.log(erro);
        }
      );
    } else {
      console.log(this.form.value.bairroId)
      //pega o id do endereco que esta contido na crianca a ser editada
      endereco.id = crianca.enderecoId
      this.enderecoService.alterar(endereco).subscribe(
        (sucesso) => {
          this.inEventEmitterService.secondOnEvent();
          console.log(sucesso);
        },
        (erro) => {
          console.log(erro);
        }
      );
    }*/
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
