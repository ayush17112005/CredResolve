//Custom exception by extending the built-in Error class
export class DomainException extends Error{
    constructor(message: string){
        super(message); //Call the parent class constructor
        this.name = "DomainException";
        Object.setPrototypeOf(this, DomainException.prototype);
    }
}