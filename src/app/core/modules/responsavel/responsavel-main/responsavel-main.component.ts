import { Component, EventEmitter, OnInit } from '@angular/core';
import { Responsavel } from 'src/app/core/model/responsavel.model';
import { CriancaService } from 'src/app/core/services/crianca.service';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';

@Component({
  selector: 'app-responsavel-main',
  templateUrl: './responsavel-main.component.html',
  styleUrls: ['./responsavel-main.component.css']
})
export class ResponsavelMainComponent implements OnInit {

  inicializar = new EventEmitter;

  constructor(public criancaService: CriancaService, public responsavelService: ResponsavelService) {
    this.criancaService = criancaService
    this.responsavelService = responsavelService
  }

  adicionarOnPressed(event) {
    if (this.responsaveisCurrent == null) {
      this.responsaveisCurrent = [event]
    } else {
      this.responsaveisCurrent.push(event)
    }

    console.log(this.responsaveisCurrent)
  }

  remove(responsavel) {
    this.responsaveisCurrent = this.responsaveisCurrent.filter(obj => obj != responsavel)
  }

  newVisibility: boolean

  changeVisibility(div: boolean) {
    if (div) {
      div = false
    } else {
      div = true
    }

    return div
  }

  responsaveisAll: Responsavel[]
  responsaveisCurrent: Responsavel[]

  ngOnInit(): void {

    //inicializando objeto
    this.responsaveisCurrent = null

    /*
    this.responsaveisCurrent = [{
      id: null, nome: null, cpf: null, telefone1: null, telefone2: null, trabalho: null, renda: null,
      pensao: null, numeroTitulo: null, zonaTitulo: null, secaoTitulo: null, status: null, tipo: null
    }]
    */

    this.newVisibility = true
    this.listarAll()
  }

  listarAll() {
    this.responsavelService.listar().subscribe(res => {
      this.responsaveisAll = res
    })
  }

  listarCurrent(id) {
    this.responsavelService.listarCriancas(id).subscribe(res => {
      this.responsaveisCurrent = res
    })
  }

}
