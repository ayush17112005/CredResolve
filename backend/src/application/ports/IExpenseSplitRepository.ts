import { ExpenseSplit } from "../../domain/entities/ExpenseSplit.js";

export interface IExpenseSplitRepository {
  createMany(splits: ExpenseSplit[]): Promise<ExpenseSplit[]>;
  findByExpenseId(expenseId: string): Promise<ExpenseSplit[]>;
  findByUserId(userId: string): Promise<ExpenseSplit[]>;
  deleteByExpenseId(expenseId:  string): Promise<void>;
}