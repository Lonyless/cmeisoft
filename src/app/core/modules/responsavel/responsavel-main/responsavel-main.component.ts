import { Component, EventEmitter, OnInit } from '@angular/core';
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

  constructor(
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

    console.log(this.responsaveisCurrent);
  }

  remove(responsavel) {
    this.responsaveisCurrent = this.responsaveisCurrent.filter(
      (obj) => obj != responsavel
    );
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

    this.newVisibility = true;
    this.listarAll();
  }

  inserirAux() {
    this.criancaService.listar().subscribe((crianca) => {
      this.responsaveisCurrent.forEach(responsavel => {
        this.responsavelService.adicionarAux(responsavel, crianca[crianca.length-1])
        console.log("responsavel: "+responsavel)
        console.log("crianca: "+crianca)
      })
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
    console.log('emmitiu');
  }
}
