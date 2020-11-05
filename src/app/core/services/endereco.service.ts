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

    //alterar: remover subscribe e deixar por conta da funcao que chama
    return this.http.post(`${this.apiURL}/endereco`, endereco)
 
  }

  alterar(endereco: Endereco) {

    return this.http.put(`${this.apiURL}/endereco/` + endereco.id, endereco)

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