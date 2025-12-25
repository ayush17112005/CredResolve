import { DomainException } from "./DomainException.js";

export class InvalidSplitException extends DomainException {
    constructor(message: string){
        super(message);
        this.name = "InvalidSplitException";
        Object.setPrototypeOf(this, InvalidSplitException.prototype);
    }
}