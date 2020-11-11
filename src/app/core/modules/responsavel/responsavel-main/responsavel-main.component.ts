import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Responsavel } from 'src/app/core/model/responsavel.model';
import { CriancaService } from 'src/app/core/services/crianca.service';
import { ResponsavelEmmiterService } from 'src/app/core/services/responsavel-emmiter.service';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';

@Component({
  selector: 'app-responsavel-main',
  templateUrl: './responsavel-main.component.html',
  styleUrls: ['./responsavel-main.component.css'],
})
export class ResponsavelMainComponent implements OnInit {
  inicializar = new EventEmitter();
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public criancaService: CriancaService,
    public responsavelService: ResponsavelService,
    private responsavelEmmiterService: ResponsavelEmmiterService
  ) {
    this.criancaService = criancaService;
    this.responsavelService = responsavelService;
  }

  adicionarOnPressed(event) {
    console.log(event);
    if (this.responsaveisCurrent == null) {
      this.responsaveisCurrent = [event];
    } else {
      this.responsaveisCurrent.push(event);
    }

    this.buildForm();
    console.log(this.responsaveisCurrent);
  }

  remove(responsavel) {
    this.responsaveisCurrent = this.responsaveisCurrent.filter(
      (obj) => obj != responsavel
    );

    this.buildForm();
  }

  newVisibility: boolean;

  changeVisibility(div: boolean) {
    if (div) {
      div = false;
    } else {
      div = true;
    }

    return div;
  }

  responsaveisAll: Responsavel[];
  responsaveisCurrent: Responsavel[];

  ngOnInit(): void {
    if (this.responsavelEmmiterService.firstSubsVar == undefined) {
      this.responsavelEmmiterService.firstSubsVar = this.responsavelEmmiterService.invokeFirstComponentFunction.subscribe(
        (name: string) => {
          this.inserirAux();
        }
      );
    }
    this.responsaveisCurrent = [];

    this.buildForm();

    this.newVisibility = true;
    this.listarAll();
  }

  buildForm() {
    const values = this.responsaveisCurrent.map((val) => new FormControl());

    this.form = this.fb.group({
      tipo: this.fb.array(values),
    });
  }

  inserirAux() {
    this.criancaService.listar().subscribe((crianca) => {
      this.responsaveisCurrent.forEach((responsavel, i) => {
        (responsavel.tipo = this.form.value.tipo[i]),
          this.responsavelService.adicionarAux(
            responsavel,
            crianca[crianca.length - 1]
          );
      });
    });
  }

  listarAll() {
    this.responsavelService.listar().subscribe((res) => {
      this.responsaveisAll = res;
    });
  }

  listarCurrent(id) {
    this.responsavelService.listarCriancas(id).subscribe((res) => {
      this.responsaveisCurrent = res;
    });
  }

  log() {
    console.log(this.form);
  }
}
