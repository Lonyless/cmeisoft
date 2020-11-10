import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class EnderecoEmmiterService {
  //chamar funcao do primeiro componente, usado para ordenar a inserção
  invokeFirstComponentFunction = new EventEmitter();
  //chama a funcao do segundo component, usado pra confirmar assim que as promisses do 1 forem concluidas
  invokeSecondComponentFunction = new EventEmitter();

  firstSubsVar: Subscription;
  secondSubsVar: Subscription;

  constructor() {}

  //emite o evento
  secondOnEvent() {
    this.invokeSecondComponentFunction.emit();
  }
  //emite o evento
  firstOnEvent() {
    this.invokeFirstComponentFunction.emit();
  }
}
