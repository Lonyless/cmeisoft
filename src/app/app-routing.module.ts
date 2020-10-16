import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from '../app/core/modules/aluno/lista/lista.component';
import { MenuComponent } from './core/modules/localizacao/menu/menu.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'main', component: ListaComponent
  },
  {
    path: 'localizacao', component: MenuComponent
  },
  {
    path: 'localizacao/cidade', component: MenuComponent
  },
  {
    path: 'localizacao/bairro', component: MenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}