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

@Injectable({
  providedIn: 'root',
}) //Serve pra criar o objeto antes de acessar a rota
export class CriterioGuard implements Resolve<Criterio[]> {
  criterios: Criterio[];

  constructor(public service: CriterioService) {
    //this.service.listar().subscribe((criterio) => (this.criterios = criterio));
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Criterio[] | Observable<Criterio[]> | Promise<Criterio[]> {
    //  if (route.params && route.params['id']) {
    //return this.service.listarPorId(route.params['id'])
    //  }

    return this.service.listar();
  }
}
