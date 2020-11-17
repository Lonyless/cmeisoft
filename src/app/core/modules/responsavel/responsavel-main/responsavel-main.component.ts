import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private responsavelEmmiterService: ResponsavelEmmiterService,
    private route: ActivatedRoute
  ) {
    this.criancaService = criancaService;
    this.responsavelService = responsavelService;
  }

  @Input() idCrianca: number;

  adicionarOnPressed(responsavel: Responsavel) {
    this.responsavelService.listar().subscribe((responsavelList) => {
      if (responsavel.id == null) {
        if (responsavelList.length < 1) {
          responsavel.id = 1;
        } else {
          responsavel.id = responsavelList[responsavelList.length - 1].id;
        }
      }

      if (this.responsaveisCurrent == null) {
        this.responsaveisCurrent = [responsavel];
      } else {
        this.responsaveisCurrent.push(responsavel);
      }

      this.buildForm();
    }).unsubscribe;
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

    //aqui ta async
    if (this.idCrianca != null) {
      this.responsavelService
        .listarCriancas(this.idCrianca)
        .subscribe((listaAuxiliarResponsavel) => {  
          listaAuxiliarResponsavel.forEach((res: any) => {
            this.responsavelService
              .listarPorId(res.responsavel_id)
              .subscribe((responsavel) => {
                responsavel[0].tipo = res.tipo;
                this.responsaveisCurrent.push(responsavel[0]);
                this.buildForm();
              });
          });
        }).unsubscribe;
    }

    this.buildForm();

    this.newVisibility = true;
    this.listarAll();
  }

  //verifica o tipo de responsavel pra dar fill no form
  checkSelected(responsavel: Responsavel, tipo: string) {
    if (responsavel.tipo == tipo) {
      return true
    }
    return false
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
    console.log(this.responsaveisCurrent);
  }
}
