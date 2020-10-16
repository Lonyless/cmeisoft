import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Bairro } from '../model/bairro.model';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Bairro[]>(`${this.apiURL}/bairro`)   //coloquei um array pra ele retornar um array de objetos

  }

  listarPorId(id: number) {

    return this.http.get<Bairro>(`${this.apiURL}/bairro/` + id);

  }

  adicionar(bairro: Bairro) {

    this.http.post(`${this.apiURL}/bairro`, bairro)
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

  alterar(bairro: Bairro) {

    this.http.put(`${this.apiURL}/bairro/` + bairro.id, bairro)
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
    this.http.delete(`${this.apiURL}/bairro/` + id)
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