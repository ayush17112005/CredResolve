export class Group{
    id: string;
    name: string;
    description?: string | undefined;
    createdBy: string; //User id
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, description: string | undefined, createdBy: string, createdAt?: Date, updatedAt?: Date){
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        this.createdAt = createdAt ? createdAt : new Date();
        this.updatedAt = updatedAt ? updatedAt : new Date();
    }

    //Business logic methods
    updateDetails(name: string, description?: string) : void{
        this.name = name;
        this.description = description;
        this.updatedAt = new Date();
    }

    isCreator(userId : string) : boolean {
        return this.createdBy === userId;
    }
}