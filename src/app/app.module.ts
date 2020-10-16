import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { CriancaService } from './core/services/crianca.service'
import { ListaComponent } from './core/modules/aluno/lista/lista.component'

import { NavbarComponent } from './core/navbar/navbar.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CmeiComponent } from './core/modules/admin/cmei/cmei.component';
import { CriteriosComponent } from './core/modules/admin/criterios/criterios.component';
import { CmeiFormComponent } from './core/modules/admin/cmei-form/cmei-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaComponent,
    CmeiComponent,
    CriteriosComponent,
    CmeiFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CriancaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
