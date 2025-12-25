import { DomainException } from "./DomainException.js";

export class InsufficientBalanceException extends DomainException {
    constructor(message: string){
        super(message);
        this.name = "InsufficientBalanceException";
        Object.setPrototypeOf(this, InsufficientBalanceException.prototype);
    }
}