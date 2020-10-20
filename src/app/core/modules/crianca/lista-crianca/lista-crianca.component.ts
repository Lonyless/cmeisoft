import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CriancaService } from 'src/app/core/services/crianca.service';

import { Crianca } from '../../../model/crianca.model'

@Component({
  selector: 'app-lista',
  templateUrl: './lista-crianca.component.html',
  styleUrls: ['./lista-crianca.component.css']
})
export class ListaComponent implements OnInit {

  id: number

  criancas: Crianca[]
  filteredCriancas: Crianca[]
  _filterBy: string

  constructor(public criancaService: CriancaService) {
    this.criancaService = criancaService
    
  }

  criancas$: Observable<Crianca[]>

  ngOnInit() {
    this.criancaService.listar().subscribe(res => {
      this.criancas = res
      this.filteredCriancas = res
    })
  }

  getId(_id) {
    this.id = _id
  }

  set filter(value: string) {
    this._filterBy = value

    this.filteredCriancas = this.criancas.filter(al => al.nome.toLocaleLowerCase().indexOf(this._filterBy.toLowerCase()) > -1)
  }

  get filter() {
    return this._filterBy
  }

}
