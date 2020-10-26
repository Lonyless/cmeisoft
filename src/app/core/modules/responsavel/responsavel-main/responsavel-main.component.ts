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

  newVisibility: boolean

  changeNewVisibility() {
    if (this.newVisibility) {
      this.newVisibility = false
    } else {
      this.newVisibility = true

    }
  }

  ngOnInit(): void {
    this.newVisibility = false
    this.listarAll()
  }

  responsaveisAll: Responsavel[]
  responsaveisCurrent: Responsavel[]

  listarAll() {
    this.responsavelService.listar().subscribe(res => {
      this.responsaveisAll = res
    })
  }

  listarCurrent() {
    this.responsavelService.listar().subscribe(res => {
      this.responsaveisCurrent = res
    })
  }

}
