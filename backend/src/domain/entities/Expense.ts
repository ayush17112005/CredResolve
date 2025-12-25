import type { ExpenseCategory } from "../enums/ExpenseCategory.js";
import { SplitType } from "../enums/SplitType.js";

export class Expense{
    id: string;
    groupId: string;
    description: string;
    amount: number;
    category: ExpenseCategory;
    paidBy: string; //userId
    splitType: SplitType;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, groudId: string, description: string, amount: number, category: ExpenseCategory, paidBy: string, splitType: SplitType, createdAt: Date, updatedAt: Date){
        this.id = id;
        this.groupId = groudId;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.paidBy = paidBy;
        this.splitType = splitType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //Business Logic 
    isValidAmount(): boolean{
        return this.amount > 0;
    }

    isPaidBy(userId: string): boolean{
        return this.paidBy === userId;
    }
}