import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Criterio } from '../model/criterio.model';
import { CriterioService } from '../services/criterioservice';

@Injectable() //Serve pra criar o objeto antes de acessar a rota
export class CriterioGuard implements Resolve<Criterio[]> {
  constructor(public service: CriterioService) {}

  criterioList: Criterio[];
  criterioListId: Observable<Criterio>;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Criterio[]> | Promise<Criterio[]> | Criterio[] {
    if (route.params && route.params['id']) {
      this.criterioListId[0] = this.service.listarPorId(route.params['id']);
      return this.criterioListId[0];
    }
    this.service.listar().subscribe((res) => (this.criterioList = res));

    return this.criterioList;
  }
}
