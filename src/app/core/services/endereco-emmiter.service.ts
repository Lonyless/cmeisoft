import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
    providedIn: 'root'
})
export class EnderecoEmmiterService {

    invokeFirstComponentFunction = new EventEmitter();
    subsVar: Subscription;

    constructor() { }

    onEvent() {
        this.invokeFirstComponentFunction.emit();
    }
}    