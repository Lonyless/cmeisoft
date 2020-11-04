import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Responsavel } from '../model/responsavel.model';
import { Crianca } from '../model/crianca.model';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {
  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Responsavel[]>(`${this.apiURL}/responsavel`); //coloquei um array pra ele retornar um array de objetos
  }

  listarPorId(id: number) {
    return this.http.get<Responsavel>(`${this.apiURL}/responsavel/` + id);
  }

  listarCriancas(id: number) {
    return this.http.get<Responsavel[]>(`${this.apiURL}/responsavel/get/` + id);
  }

  adicionarAux(responsavel: Responsavel, crianca: Crianca) {
    const criterioAuxCrianca = {
      criancaId: crianca.id,
      responsavelId: responsavel.id,
    };
    this.http
      .post(`${this.apiURL}/responsavelAux`, criterioAuxCrianca)
      .subscribe(
        (resultado) => {
          console.log(resultado);
        },
        (erro) => {
          if (erro.status == 400) {
            console.log(erro);
          }
        }
      );
  }

  adicionar(responsavel: Responsavel) {
    this.http.post(`${this.apiURL}/responsavel`, responsavel).subscribe(
      (resultado) => {
        console.log(resultado);
      },
      (erro) => {
        if (erro.status == 400) {
          console.log(erro);
        }
      }
    );
  }

  alterar(responsavel: Responsavel) {
    this.http
      .put(`${this.apiURL}/responsavel/` + responsavel.id, responsavel)
      .subscribe(
        (resultado) => {
          console.log('alterado com sucesso.');
        },
        (erro) => {
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
    this.http.delete(`${this.apiURL}/responsavel/` + id).subscribe(
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
