import type { ColumnTypeUndefinedError } from "typeorm/browser";

export class ExpenseSplit {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  percentage?:  number | undefined
  createdAt:  Date;

  constructor(
    id: string,
    expenseId: string,
    userId: string,
    amount: number,
    percentage?: number,
    createdAt?: Date
  ) {
    this.id = id;
    this.expenseId = expenseId;
    this.userId = userId;
    this.amount = amount;
    this.percentage = percentage;
    this.createdAt = createdAt || new Date();
  }

  isValidAmount(): boolean {
    return this. amount >= 0;
  }

  isValidPercentage(): boolean {
    if (this.percentage === undefined || this.percentage === null) {
      return true;
    }
    return this. percentage >= 0 && this. percentage <= 100;
  }
}