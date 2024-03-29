import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Criterio } from '../model/criterio.model';
import { Crianca } from '../model/crianca.model';

@Injectable({
  providedIn: 'root',
})
export class CriterioService {
  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  readonly apiURL: string;

  listar() {
    return this.http.get<Criterio[]>(`${this.apiURL}/criteriosocial`); //coloquei um array pra ele retornar um array de objetos
  }

  listarAux() {
    return this.http.get<[]>(`${this.apiURL}/criteriosocialAux`);
  }

  listarPorId(id: number) {
    return this.http.get<Criterio>(`${this.apiURL}/criteriosocial/` + id);
  }

  adicionarAux(criterio: Criterio, crianca: Crianca) {
    const criterioAuxCrianca = {
      criterioId: criterio.id,
      criancaId: crianca.id,
    };
    this.http
      .post(`${this.apiURL}/criteriosocialAux`, criterioAuxCrianca)
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

  deletarAux(id: number) {
    return this.http.delete(`${this.apiURL}/criteriosocialAux/` + id)
  }

  adicionar(criterio: Criterio) {
    this.http.post(`${this.apiURL}/criteriosocial`, criterio).subscribe(
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

  alterar(criterio: Criterio) {
    this.http
      .put(`${this.apiURL}/criteriosocial/` + criterio.id, criterio)
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
    this.http.delete(`${this.apiURL}/criteriosocial/` + id).subscribe(
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
