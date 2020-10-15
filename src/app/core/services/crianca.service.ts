import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Crianca } from '../model/crianca.model';

@Injectable({
  providedIn: 'root'
})
export class CriancaService {

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Crianca[]>(`${this.apiURL}/crianca`)   //coloquei um array pra ele retornar um array de objetos

  }

  listarPorId(id: number) {

    return this.http.get<Crianca>(`${this.apiURL}/crianca/` + id);

  }

  adicionar(crianca: Crianca) {

    this.http.post(`${this.apiURL}/crianca`, crianca)
      .subscribe(
        resultado => {
          console.log(resultado)
        },
        erro => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  alterar(crianca: Crianca) {

    this.http.put(`${this.apiURL}/crianca/` + crianca.id, crianca)
      .subscribe(
        resultado => {
          console.log('alterado com sucesso.')
        },
        erro => {
          switch (erro.status) {
            case 400:
              console.log(erro.error.mensagem);
              break;
            case 404:
              console.log('não localizado.');
              break;
          }
        }
      );
  }

  excluir(id: number) {
    this.http.delete(`${this.apiURL}/crianca/` + id)
      .subscribe(
        resultado => {
          console.log('excluído com sucesso.');
        },
        erro => {
          if (erro.status == 404) {
            console.log('não localizado.');
          }
        }
      );
  }
}