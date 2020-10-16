import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'


import { CriancaService } from './core/services/crianca.service'
import { CmeiService } from './core/services/cmei.service'
import { ListaComponent } from './core/modules/aluno/lista/lista.component'

import { NavbarComponent } from './core/navbar/navbar.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriosComponent } from './core/modules/admin/criterios/criterios.component';
import { CmeiFormComponent } from './core/modules/admin/cmei-form/cmei-form.component';
import { CmeiListaComponent } from './core/modules/admin/cmei-lista/cmei-lista.component';
import { EnderecoFormComponent } from './core/modules/localizacao/endereco-form/endereco-form.component';
import { CidadeFormComponent } from './core/modules/localizacao/cidade-form/cidade-form.component';
import { MenuComponent } from './core/modules/localizacao/menu/menu.component';
import { CidadeListaComponent } from './core/modules/localizacao/cidade-lista/cidade-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaComponent,
    CriteriosComponent,
    CmeiFormComponent,
    CmeiListaComponent,
    EnderecoFormComponent,
    CidadeFormComponent,
    MenuComponent,
    CidadeListaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CriancaService, CmeiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
