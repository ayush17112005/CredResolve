export class User{
    id: string;
    name: string;
    email: string;
    phone?: string | undefined;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, email: string, phone?: string, createdAt?: Date, updatedAt?: Date){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt ? createdAt : new Date();
        this.updatedAt = updatedAt ? updatedAt : new Date();
    }

    //Business Logic methods
    updateProfile(name: string, phone?: string) : void{
        this.name = name;
        this.phone = phone;
        this.updatedAt = new Date();
    }

    isValidEmail() : boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}