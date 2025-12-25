export class Settlement{
    id: string;
    groupId: string;
    paidBy: string;
    paidTo: string;
    amount: number;
    settlementDate: Date;
    createdAt: Date;

    constructor(id: string, groupId: string, paidBy: string, paidTo: string, amount: number, settelmentDate: Date, createdAt?: Date){
        this.id = id;
        this.groupId = groupId;
        this.paidBy = paidBy;
        this.paidTo = paidTo;
        this.amount = amount;
        this.settlementDate = settelmentDate;
        this.createdAt = createdAt || new Date();
    }

    //Business logic methods
    isValidAmount(): boolean {
        return this.amount > 0;
    }

    isValid() : boolean{
        return this.isValidAmount() && this.paidBy !== this.paidTo;
    }
}