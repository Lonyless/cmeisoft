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

  changeVisibility(div: boolean) {
    if (div) {
      div = false
    } else {
      div = true
    } 
    
    return div
  }

  ngOnInit(): void {
    this.newVisibility = true
    this.listarAll()
  }

  responsaveisAll: Responsavel[]
  responsaveisCurrent: Responsavel[]

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
