import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/core/model/endereco.model';
import { CriancaService } from 'src/app/core/services/crianca.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';

import { Crianca } from '../../../model/crianca.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista-crianca.component.html',
  styleUrls: ['./lista-crianca.component.css'],
})
export class ListaComponent implements OnInit {
  id: number;

  criancas: Crianca[];
  filteredCriancas: Crianca[];
  _filterBy: string;

  constructor(
    public criancaService: CriancaService,
    public enderecoService: EnderecoService,
    public router: Router
  ) {
    this.criancaService = criancaService;
    this.selectedCrianca = new Crianca();
  }

  criancas$: Observable<Crianca[]>;

  ngOnInit() {
    this.criancaService.listar().subscribe((res) => {
      this.criancas = res;
      this.filteredCriancas = res;
    });
  }

  getId(_id) {
    this.id = _id;
  }

  selectedCrianca: any;
  //selectedCriancaEndereco: Endereco = new Endereco(null, null, null, null);

  getCrianca(crianca) {

    this.selectedCrianca = crianca;
    this.selectedCrianca.nascimento = this.selectedCrianca.nascimento.slice(
      0,
      10
    );
    console.log(this.selectedCrianca);
  }

  refresh(): void {
    window.location.reload();
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredCriancas = this.criancas.filter(
      (al) =>
        al.nome.toLocaleLowerCase().indexOf(this._filterBy.toLowerCase()) > -1
    );
  }

  get filter() {
    return this._filterBy;
  }

  /**
   * navega ate a rota passando parametros
   * @param crianca crianca a ser editada
   */
  editarRoute(crianca) {
    this.router.navigate(['/crianca/editar'],
     { queryParams: 
      { criancaId: crianca.id, enderecoId: crianca.endereco_id } 
    });
  }
}
