import { DomainException } from "./DomainException.js";

export class GroupNotFoundException extends DomainException {
    constructor(message: string){
        super(message);
        this.name = "GroupNotFoundException";
        Object.setPrototypeOf(this, GroupNotFoundException.prototype);
    }  
}