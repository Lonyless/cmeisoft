import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelEmmiterService {
  invokeFirstComponentFunction = new EventEmitter();
  invokeSecondComponentFunction = new EventEmitter();

  firstSubsVar: Subscription;
  secondSubsVar: Subscription;

  constructor() {}

  firstOnEvent(data) {
    this.invokeFirstComponentFunction.emit(data);
  }
  secondOnEvent() {
    this.invokeSecondComponentFunction.emit();
  }
}
