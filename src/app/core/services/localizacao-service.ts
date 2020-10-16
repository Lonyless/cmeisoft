import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Cmei } from '../model/cmei.model';

@Injectable({
  providedIn: 'root'
})
export class CmeiService {

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Cmei[]>(`${this.apiURL}/cmei`)   //coloquei um array pra ele retornar um array de objetos

  }

  listarPorId(id: number) {

    return this.http.get<Cmei>(`${this.apiURL}/cmei/` + id);

  }

  adicionar(cmei: Cmei) {

    this.http.post(`${this.apiURL}/cmei`, cmei)
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

  alterar(cmei: Cmei) {

    this.http.put(`${this.apiURL}/cmei/` + cmei.id, cmei)
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
    this.http.delete(`${this.apiURL}/cmei/` + id)
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