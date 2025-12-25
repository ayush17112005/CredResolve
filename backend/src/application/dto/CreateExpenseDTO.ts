import { SplitType } from "../../domain/enums/SplitType.js";
import { ExpenseCategory } from "../../domain/enums/ExpenseCategory.js";

export interface CreateExpenseDTO {
  groupId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string; // User ID
  splitType:  SplitType;
  participants: ParticipantDTO[];
}

export interface ParticipantDTO {
  userId: string;
  amount?:  number; // For EXACT split
  percentage?: number; // For PERCENTAGE split
}

export interface ExpenseResponseDTO {
  id:  string;
  groupId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string;
  splitType: SplitType;
  expenseDate: Date;
  splits: ExpenseSplitResponseDTO[];
}

export interface ExpenseSplitResponseDTO {
  userId: string;
  amount: number;
  percentage?:  number;
}