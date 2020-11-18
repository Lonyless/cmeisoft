import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Crianca } from '../model/crianca.model';

@Injectable({
  providedIn: 'root',
})
export class CriancaService {
  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Crianca[]>(`${this.apiURL}/crianca`); //coloquei um array pra ele retornar um array de objetos
  }

  listarPorId(id: number) {
    return this.http.get<Crianca>(`${this.apiURL}/crianca/` + id);
  }

  adicionar(crianca: Crianca) {
    return this.http.post(`${this.apiURL}/crianca`, crianca);
  }

  alterar(crianca: Crianca) {
    return this.http.put(`${this.apiURL}/crianca/` + crianca.id, crianca)
  }

  excluir(id: number) {
    this.http.delete(`${this.apiURL}/crianca/` + id).subscribe(
      (resultado) => {
        console.log('excluído com sucesso.');
      },
      (erro) => {
        if (erro.status == 404) {
          console.log('não localizado.');
        }
      }
    );
  }
}
