import { Component, OnInit } from '@angular/core';
import { Cidade } from 'src/app/core/model/cidade.model';
import { CidadeService } from 'src/app/core/services/cidade.service';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrls: ['./cidade-lista.component.css']
})
export class CidadeListaComponent implements OnInit {

  cidades: Cidade[]

  constructor(public cidadeService: CidadeService) {
    this.cidadeService = cidadeService
  }

  ngOnInit(): void {
    this.cidadeService.listar().subscribe(res => {
      this.cidades = res
    })
  }

}
