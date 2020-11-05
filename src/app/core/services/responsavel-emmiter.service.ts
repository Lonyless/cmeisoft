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

  firstOnEvent() {
    this.invokeFirstComponentFunction.emit();
  }
  secondOnEvent() {
    this.invokeSecondComponentFunction.emit();
  }
}
