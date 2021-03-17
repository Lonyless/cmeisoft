import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Crianca } from 'src/app/core/model/crianca.model';
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
  @Input() form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public criancaService: CriancaService,
    public responsavelService: ResponsavelService,
    private route: ActivatedRoute
  ) {
    this.criancaService = criancaService;
    this.responsavelService = responsavelService;
  }



  //altera o tipo e envia a lista
  changeTipo(i) {
    let responsavel: Responsavel = this.responsaveisCurrent[i]
    responsavel.tipo = this.form.controls['tipo'].value[i]
    this.responsaveisCurrent.splice(i, 1, responsavel) //substitui o item na posicao i pelo novo item
    console.log(responsavel)
    this.adicionarResponsavel.emit(this.responsaveisCurrent);
  }

  adicionarOnPressed(responsavel: Responsavel) {

    const exist = this.responsaveisCurrent.filter((res) => {
      return res.id == responsavel.id;
    });

    responsavel.tipo == null ? responsavel.tipo = "Outro" : null
    exist.length < 1 ? this.responsaveisCurrent.push(responsavel) : alert('Responsavel ja esta na lista');
    this.adicionarResponsavel.emit(this.responsaveisCurrent);

    this.buildForm();

  }

  remove(responsavel) {
    this.responsaveisCurrent = this.responsaveisCurrent.filter(
      (obj) => obj != responsavel
    );
    this.adicionarResponsavel.emit(this.responsaveisCurrent)
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
  responsaveisCurrent: Responsavel[] = [];
  @Output() adicionarResponsavel = new EventEmitter();

  ngOnInit(): void {

    this.responsaveisCurrent = [];

    //aqui ta async
    var routeSubs = this.route.queryParams.subscribe(params => {

      if (params['criancaId'] != null) {
        const respSubs = this.responsavelService
          .listarCriancas(params['criancaId'])
          .subscribe((listaResponsavel) => {

            respSubs.unsubscribe()

            listaResponsavel['responsavelList'].forEach(item => {
              this.responsaveisCurrent.push(item['responsavel'])
            })

            console.log(this.responsaveisCurrent) //ate aqui ta working 17/03/2021
            this.buildForm();
            this.adicionarResponsavel.emit(this.responsaveisCurrent)
          })
      }

    })

    this.buildForm();

    this.newVisibility = true;
    this.listarAll();

  }

  //verifica o tipo de responsavel pra dar fill no form
  checkSelected(responsavel: Responsavel, tipo: string, index: number) {

    //meio POG, atribui o tipo passado para o ultimo responsavel da lista (na posicao .length-1)
    //this.form.controls['tipo'].value[this.form.controls['tipo'].value.length - 1] = responsavel.tipo;
    if (responsavel.tipo != null) {
      this.form.controls['tipo'].value[index] = responsavel.tipo;
    }

    if (responsavel.tipo == tipo) {
      return true;
    }
    return false;
  }

  buildForm() {
    const values = this.responsaveisCurrent.map((val) => new FormControl());

    this.form = this.fb.group({
      tipo: this.fb.array(values, [Validators.required]),
    });
  }

  /* totalmente deprecated
  inserirAux(crianca: Crianca) {
    //se for editar ele pega a crianca passada pelo event emmiter
    if (this.route.snapshot.params['id'] != null) {
      this.responsavelService
        .deleteAux(this.route.snapshot.params['id'])
        .subscribe(() => {
          this.responsaveisCurrent.forEach((responsavel, i) => {
            (responsavel.tipo = this.form.value.tipo[i]),
              console.log(responsavel),
              this.responsavelService.adicionarAux(responsavel, crianca);
          });
        });
    } else {
      //se for criar ele pega o ultimo adicionado da lista
      this.criancaService.listar().subscribe((criancaList) => {
        this.responsaveisCurrent.forEach((responsavel, i) => {
          (responsavel.tipo = this.form.value.tipo[i]),
            this.responsavelService.adicionarAux(
              responsavel,
              criancaList[criancaList.length - 1]
            );
        });
      });
    }
  } */

  listarAll() {
    const subs = this.responsavelService.listar().subscribe((res) => {
      this.responsaveisAll = res;
      subs.unsubscribe()
    });
  }

  listarCurrent(id) {
    const subs = this.responsavelService.listarCriancas(id).subscribe((res) => {
      this.responsaveisCurrent = res;
      subs.unsubscribe()
    });
  }

  log(i?) {
    console.log(this.responsaveisCurrent[i])
  }
}
