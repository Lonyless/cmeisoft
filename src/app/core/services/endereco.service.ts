import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { Endereco } from '../model/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Endereco[]>(`${this.apiURL}/endereco`)   //coloquei um array pra ele retornar um array de objetos

  }

  listarPorId(id: number) {

    return this.http.get<Endereco>(`${this.apiURL}/endereco/` + id);

  }

  adicionar(endereco: Endereco) {

    this.http.post(`${this.apiURL}/endereco`, endereco)
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

  alterar(endereco: Endereco) {

    this.http.put(`${this.apiURL}/endereco/` + endereco.id, endereco)
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
    this.http.delete(`${this.apiURL}/endereco/` + id)
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