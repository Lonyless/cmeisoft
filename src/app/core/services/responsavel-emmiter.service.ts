import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
    providedIn: 'root'
})
export class ResponsavelEmmiterService {

    invokeFirstComponentFunction = new EventEmitter();
    subsVar: Subscription;

    constructor() { }

    onEvent() {
        this.invokeFirstComponentFunction.emit();
    }
}    