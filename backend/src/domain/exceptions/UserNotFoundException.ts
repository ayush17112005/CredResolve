import { DomainException } from "./DomainException.js";

export class UserNotFoundException extends DomainException {
    constructor(message: string){
        super(message);
        this.name = "UserNotFoundException";
        Object.setPrototypeOf(this, UserNotFoundException.prototype);
    }
}