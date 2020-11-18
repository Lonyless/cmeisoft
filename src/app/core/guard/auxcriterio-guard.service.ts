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
export class AuxCriterioGuard implements Resolve<any> {
  //criterios: Criterio[];

  constructor(public service: CriterioService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Criterio[] | Observable<any[]> | Promise<Criterio[]> | any {
    //  if (route.params && route.params['id']) {
    //return this.service.listarPorId(route.params['id'])
    //  }

    return this.service.listarAux();
  }
}
