import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from '../app/core/modules/crianca/lista-crianca/lista-crianca.component';
import { FormCriancaComponent } from './core/modules/crianca/form-crianca/form-crianca.component';
import { BairroFormComponent } from './core/modules/localizacao/bairro-form/bairro-form.component';
import { CidadeFormComponent } from './core/modules/localizacao/cidade-form/cidade-form.component';
import { CidadeListaComponent } from './core/modules/localizacao/cidade-lista/cidade-lista.component';
import { MenuComponent } from './core/modules/localizacao/menu/menu.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'main', component: ListaComponent
  },
  {
    path: 'crianca/novo', component: FormCriancaComponent
  },
  {
    path: 'localizacao', component: MenuComponent
  },
  {
    path: 'localizacao/cidade', component: CidadeFormComponent
  },
  {
    path: 'localizacao/bairro', component: BairroFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}