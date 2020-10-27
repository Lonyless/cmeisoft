import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { CriancaService } from './core/services/crianca.service'
import { CmeiService } from './core/services/cmei.service'
import { ListaComponent } from './core/modules/crianca/lista-crianca/lista-crianca.component'

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
import { BairroFormComponent } from './core/modules/localizacao/bairro-form/bairro-form.component';
import { FormCriancaComponent } from './core/modules/crianca/form-crianca/form-crianca.component';
import { BairroListaComponent } from './core/modules/localizacao/bairro-lista/bairro-lista.component';
import { ResponsavelFormComponent } from './core/modules/responsavel/responsavel-form/responsavel-form.component';
import { ResponsavelListaComponent } from './core/modules/responsavel/responsavel-lista/responsavel-lista.component';
import { ResponsavelMainComponent } from './core/modules/responsavel/responsavel-main/responsavel-main.component';
import { CriterioFormComponent } from './core/modules/criterio/criterio-form/criterio-form.component';
import { CriterioListComponent } from './core/modules/criterio/criterio-list/criterio-list.component';

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
    BairroFormComponent,
    FormCriancaComponent,
    BairroListaComponent,
    ResponsavelFormComponent,
    ResponsavelListaComponent,
    ResponsavelMainComponent,
    CriterioFormComponent,
    CriterioListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [CriancaService, CmeiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
