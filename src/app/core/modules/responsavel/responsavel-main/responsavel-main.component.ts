import { Component, EventEmitter, Input, OnInit } from '@angular/core';
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
    private responsavelEmmiterService: ResponsavelEmmiterService,
    private route: ActivatedRoute
  ) {
    this.criancaService = criancaService;
    this.responsavelService = responsavelService;
  }

  @Input() idCrianca: number;

  adicionarOnPressed(responsavel: Responsavel) {
    //atribui a uma variavel para poder dar unsubscribe de forma asincrona

    const subscription = this.responsavelService
      .listar()
      .subscribe((responsavelList) => {
        
        console.log(responsavelList)

        if (responsavel.id == null) {
          if (responsavelList.length < 1) {
            //TOFIX: se a table não estiver truncada isso aqui vai gerar um BUG
            responsavel.id = 1;
          } else {
            //erro: gerando id repetido
            responsavel.id = responsavelList[responsavelList.length - 1].id+1;
          }
        }

        console.log(responsavel);

        //verifica se o responsavel ja esta na lista
        if (this.responsaveisCurrent == null) {
          this.responsaveisCurrent = [responsavel];
        } else {
          const exist = this.responsaveisCurrent.filter((res) => {
            return res.nome == responsavel.nome;
          });
          console.log(exist);
          if (exist.length < 1) {
            this.responsaveisCurrent.push(responsavel);
          } else {
            alert('Responsavel ja esta na lista');
          }
        }

        this.buildForm();

        //unsubs depois que todas as operações forem concluidas
        //evitando bugs
        subscription.unsubscribe();

        //acessando o ultimo item do array de forms
        //this.form.controls['tipo'].value[this.form.controls['tipo'].value.length - 1] = responsavel.tipo
      });
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
        (crianca) => {
          this.inserirAux(crianca);
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
    //TOFIX: Quando é adicionado um responsavel criado ele rebuilda o form e perde os valores de tipo ja adicionados
    const values = this.responsaveisCurrent.map((val) => new FormControl());

    this.form = this.fb.group({
      tipo: this.fb.array(values, [Validators.required]),
    });
  }

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
    console.log(this.form.value);
  }
}
