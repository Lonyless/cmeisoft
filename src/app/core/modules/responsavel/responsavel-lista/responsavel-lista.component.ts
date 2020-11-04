import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Crianca } from 'src/app/core/model/crianca.model';
import { Responsavel } from 'src/app/core/model/responsavel.model';
import { CriancaService } from 'src/app/core/services/crianca.service';
import { ResponsavelService } from 'src/app/core/services/responsavel.service.';

@Component({
  selector: 'app-responsavel-lista',
  templateUrl: './responsavel-lista.component.html',
  styleUrls: ['./responsavel-lista.component.css'],
})
export class ResponsavelListaComponent implements OnInit {
  constructor(
    public criancaService: CriancaService,
    public responsavelService: ResponsavelService
  ) {
    this.criancaService = criancaService;
  }

  ngOnInit(): void {
    this.listar()
    this.filteredResponsavel = this.responsaveis;
  }

  listar() {
    this.responsavelService.listar().subscribe((res) => {
      this.responsaveis = res;
      this.filteredResponsavel = res;
    });
  }

  adicionarResponsavelOnPressed(responsavel) {
    this.adicionarResponsavel.emit(responsavel);
  }

  id: number;

  @Output() adicionarResponsavel = new EventEmitter();
  @Input() responsaveis: Responsavel[];
  filteredResponsavel: Responsavel[];
  _filterBy: string;

  responsavel$: Observable<Responsavel[]>;

  getId(_id) {
    this.id = _id;
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredResponsavel = this.responsaveis.filter(
      (al) =>
        al.nome.toLocaleLowerCase().indexOf(this._filterBy.toLowerCase()) > -1
    );
  }

  get filter() {
    return this._filterBy;
  }
}
