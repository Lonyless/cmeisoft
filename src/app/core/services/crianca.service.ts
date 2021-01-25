import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Crianca } from '../model/crianca.model';
import { Endereco } from '../model/endereco.model';
import { Responsavel } from '../model/responsavel.model';
import { Cmei } from '../model/cmei.model';
import { Criterio } from '../model/criterio.model';

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

  /**
   * deprecated
   * @param crianca 
   */
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

  /**
   * Salva a crianca e todos os registros necessarios para se adicionar uma crianca no banco
   * @param crianca crianca a ser adiconada 
   * @param endereco endereco da crianca
   * @param responsavelList lista de responsaveis ligados a crianca
   * @param criterioList lista de criterios sociais ligados a crianca
   */
  salvarTodos(
    crianca: Crianca,
    endereco: Endereco,
    responsavelList: Responsavel[],
    criterioList: Criterio[]) {

    if (crianca.id == null) { //create
      var insertEndereco = this.http.post(`${this.apiURL}/endereco/`, endereco).subscribe(_endereco => {

        crianca.enderecoId = _endereco['insertId'];

        insertEndereco.unsubscribe();

        var insertCrianca = this.http.post(`${this.apiURL}/crianca/`, crianca).subscribe(_crianca => {

          insertCrianca.unsubscribe();

          responsavelList.forEach(responsavel => {

            const respAuxCrianca = {
              criancaId: _crianca['insertId'],
              responsavelId: responsavel.id,
              responsavelTipo: responsavel.tipo,
            };
            var insertResponsavelAux = this.http.post(`${this.apiURL}/responsavelAux`, respAuxCrianca).subscribe(responsavel => {
              console.log(responsavel);
              insertResponsavelAux.unsubscribe();
            });

          });

          criterioList.forEach(criterio => {
            const criterioAuxCrianca = {
              criterioId: criterio.id,
              criancaId: _crianca['insertId'],
            };
            var insertCriterioAux = this.http.post(`${this.apiURL}/criteriosocialAux`, criterioAuxCrianca).subscribe((resultado) => {
              console.log(resultado);
              insertCriterioAux.unsubscribe();
            });

          })
        })     
      })      
    } else { //update --------------------------------------------------------------------------------
      var insertEndereco = this.http.put(`${this.apiURL}/endereco/` + endereco.id, endereco).subscribe(_endereco => {

        //crianca.enderecoId = _endereco['insertId'];

        insertEndereco.unsubscribe();

        console.log(_endereco)

        var insertCrianca = this.http.put(`${this.apiURL}/crianca/` + crianca.id, crianca).subscribe(_crianca => {

          insertCrianca.unsubscribe();

          console.log(_crianca)

          var deleteRespoAux = this.http.delete(`${this.apiURL}/responsavelAux/` + crianca.id).subscribe(() => {

            deleteRespoAux.unsubscribe()

            responsavelList.forEach(responsavel => {

              const respAuxCrianca = {
                criancaId: crianca.id,
                responsavelId: responsavel.id,
                responsavelTipo: responsavel.tipo,
              };
              var insertResponsavelAux = this.http.post(`${this.apiURL}/responsavelAux`, respAuxCrianca).subscribe(responsavel => {
                console.log(responsavel);
                insertResponsavelAux.unsubscribe();
              });

            });
          })

          var deleteCritAux = this.http.delete(`${this.apiURL}/criteriosocialAux/` + crianca.id).subscribe(() => {
            deleteCritAux.unsubscribe()

            console.log(criterioList)

            criterioList.forEach(criterio => {
              const criterioAuxCrianca = {
                criterioId: criterio.id,
                criancaId: crianca.id,
              };
              var insertCriterioAux = this.http.post(`${this.apiURL}/criteriosocialAux`, criterioAuxCrianca).subscribe((resultado) => {
                console.log(resultado);
                insertCriterioAux.unsubscribe();
              });

            })
          })

        })
      })
    }

  }
}
