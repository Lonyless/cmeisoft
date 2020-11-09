import {
  Component,
  EventEmitter,
  Input,
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
export class EnderecoFormComponent implements OnInit {
  @Input() form: FormGroup;

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
  //@Input() formBehavior: BehaviorSubject<FormGroup>;

  ngOnInit(): void {
    //this.formBehavior = new BehaviorSubject<FormGroup>(this.form);

    if (this.inEventEmitterService.firstSubsVar == undefined) {
      this.inEventEmitterService.firstSubsVar = this.inEventEmitterService.invokeFirstComponentFunction.subscribe(
        () => {
          console.log('IN');
          this.onSubmit();
        }
      );
    }

    this._visibilidade = true;

    this.bairroService.listar().subscribe((res) => {
      this.bairros = res;
    }).unsubscribe;

  }

  setar() {
    this.bairroService.listar().subscribe((res) => {
      (this.bairros = res),
        this.form.patchValue({
          bairroId: this.bairros[this.bairros.length - 1].id,
        });
    }).unsubscribe;
  }

  onSubmit() {
    const endereco = new Endereco(
      null,
      this.form.value.ruaEndereco,
      this.form.value.numeroEndereco,
      this.form.value.bairroId
    );

    console.log(endereco);
    this.enderecoService.adicionar(endereco).subscribe(
      (sucesso) => {
        this.inEventEmitterService.secondOnEvent();
        console.log(sucesso);
      },
      (erro) => {
        console.log(erro);
      }
    );
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
