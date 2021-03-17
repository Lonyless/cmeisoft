import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from '../app/core/modules/crianca/lista-crianca/lista-crianca.component';
import { CriterioGuard } from './core/guard/criterio-guard.service';
import { CmeiFormComponent } from './core/modules/cmei/cmei-form/cmei-form.component';
import { CmeiListComponent } from './core/modules/cmei/cmei-list/cmei-list.component';
import { FormCriancaComponent } from './core/modules/crianca/form-crianca/form-crianca.component';
import { CriterioFormComponent } from './core/modules/criterio/criterio-form/criterio-form.component';
import { BairroFormComponent } from './core/modules/localizacao/bairro-form/bairro-form.component';
import { CidadeFormComponent } from './core/modules/localizacao/cidade-form/cidade-form.component';
import { CidadeListaComponent } from './core/modules/localizacao/cidade-lista/cidade-lista.component';
import { MenuComponent } from './core/modules/localizacao/menu/menu.component';
import { RelatorioListComponent } from './core/modules/relatorio/relatorio-list/relatorio-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: ListaComponent,
  },
  {
    path: 'crianca/novo',
    component: FormCriancaComponent,
    resolve: {
      criterios: CriterioGuard,
    },
  },
  {
    path: 'crianca/editar',
    component: FormCriancaComponent,
    resolve: {
      //carrega a lista de criterios
      criterios: CriterioGuard,
    },
  },
  {
    path: 'localizacao',
    component: MenuComponent,
  },
  {
    path: 'cmei',
    component: CmeiFormComponent,
  },
  {
    path: 'localizacao/cidade',
    component: CidadeFormComponent,
  },
  {
    path: 'localizacao/bairro',
    component: BairroFormComponent,
  },
  {
    path: 'criterio',
    component: CriterioFormComponent,
  },
  {
    path: 'relatorio',
    component: RelatorioListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
