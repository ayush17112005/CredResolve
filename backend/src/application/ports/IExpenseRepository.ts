import { Expense } from "../../domain/entities/Expense.js";

export interface IExpenseRepository {
  create(expense: Expense): Promise<Expense>;
  findById(id: string): Promise<Expense | null>;
  findByGroupId(groupId: string): Promise<Expense[]>;
  findByUserId(userId: string): Promise<Expense[]>; // Expenses paid by user
  update(expense:  Expense): Promise<Expense>;
  delete(id: string): Promise<void>;
}