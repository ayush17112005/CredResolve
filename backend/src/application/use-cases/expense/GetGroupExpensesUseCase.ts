import type { IExpenseRepository } from '../../ports/IExpenseRepository.js';
import type { IGroupRepository } from '../../ports/IGroupRepository.js';
import type { ExpenseResponseDTO } from '../../dto/CreateExpenseDTO.js';
import { GroupNotFoundException } from '../../../domain/exceptions/GroupNotFoundException.js';

export class GetGroupExpensesUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private groupRepository: IGroupRepository
  ) {}

  async execute(groupId:  string): Promise<ExpenseResponseDTO[]> {
    // Verify group exists
    const group = await this.groupRepository.findById(groupId);
    if (!group) {
      throw new GroupNotFoundException(groupId);
    }

    // Get expenses
    const expenses = await this.expenseRepository.findByGroupId(groupId);

    return expenses.map(expense => ({
      id: expense.id,
      groupId: expense.groupId,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      paidBy: expense.paidBy,
      splitType:  expense.splitType,
      splits: [], // Can be populated if needed
    }));
  }
}