import { v4 as uuidv4 } from 'uuid';
import { Balance } from '../../domain/entities/Balance.js';
import { ExpenseSplit } from '../../domain/entities/ExpenseSplit.js';
import type { IBalanceRepository } from '../ports/IBalanceRepository.js';

export class BalanceCalculatorService {
  constructor(private balanceRepository: IBalanceRepository) {}

  async updateBalancesForExpense(
    groupId: string,
    paidBy: string,
    splits: ExpenseSplit[]
  ): Promise<void> {
    for (const split of splits) {
      // Skip if the payer is also a participant (they don't owe themselves)
      if (split.userId === paidBy) {
        continue;
      }

      // split.userId owes paidBy the split. amount
      await this.upsertBalance(groupId, split.userId, paidBy, split.amount);
    }
  }

  private async upsertBalance(
    groupId: string,
    userId: string,
    owesTo: string,
    amount: number
  ): Promise<void> {
    // Check if balance already exists
    const existingBalance = await this.balanceRepository.findByUserPair(
      groupId,
      userId,
      owesTo
    );

    if (existingBalance) {
      // Update existing balance
      existingBalance.updateAmount(existingBalance.amount + amount);
      await this.balanceRepository.update(existingBalance);
    } else {
      // Create new balance
      const newBalance = new Balance(
        uuidv4(),
        groupId,
        userId,
        owesTo,
        amount
      );
      await this.balanceRepository.create(newBalance);
    }

    // Simplify: Check if there's a reverse balance
    const reverseBalance = await this.balanceRepository.findByUserPair(
      groupId,
      owesTo,
      userId
    );

    if (reverseBalance) {
      await this.simplifyTwoWayBalance(existingBalance || await this.balanceRepository.findByUserPair(groupId, userId, owesTo), reverseBalance);
    }
  }

  private async simplifyTwoWayBalance(
    balance1: Balance | null,
    balance2: Balance | null
  ): Promise<void> {
    if (!balance1 || !balance2) return;

    if (balance1.amount > balance2.amount) {
      balance1.updateAmount(balance1.amount - balance2.amount);
      await this.balanceRepository.update(balance1);
      await this.balanceRepository.delete(balance2.id);
    } else if (balance2.amount > balance1.amount) {
      balance2.updateAmount(balance2.amount - balance1.amount);
      await this.balanceRepository.update(balance2);
      await this.balanceRepository.delete(balance1.id);
    } else {
      // Equal amounts, delete both
      await this.balanceRepository.delete(balance1.id);
      await this.balanceRepository.delete(balance2.id);
    }
  }

  async updateBalancesForSettlement(
    groupId: string,
    paidBy: string,
    paidTo: string,
    amount: number
  ): Promise<void> {
    // Find the balance where paidBy owes paidTo
    const balance = await this.balanceRepository. findByUserPair(
      groupId,
      paidBy,
      paidTo
    );

    if (!balance) {
      throw new Error('No balance found to settle');
    }

    if (amount > balance.amount) {
      throw new Error('Settlement amount cannot exceed balance amount');
    }

    if (amount === balance.amount) {
      // Fully settled, delete the balance
      await this. balanceRepository.delete(balance. id);
    } else {
      // Partial settlement, reduce the balance
      balance.reduceAmount(amount);
      await this.balanceRepository.update(balance);
    }
  }
}