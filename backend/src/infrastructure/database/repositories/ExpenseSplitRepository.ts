import { Repository } from 'typeorm';
import {type IExpenseSplitRepository } from '../../../application/ports/IExpenseSplitRepository.js';
import { ExpenseSplit } from '../../../domain/entities/ExpenseSplit.js';
import { ExpenseSplitModel } from '../models/ExpenseSplitModel.js';
import { ExpenseSplitMapper } from '../mappers/ExpenseSplitMapper.js';
import { AppDataSource } from '../config/database.config.js';

export class ExpenseSplitRepository implements IExpenseSplitRepository {
  private repository: Repository<ExpenseSplitModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(ExpenseSplitModel);
  }

  async createMany(splits: ExpenseSplit[]): Promise<ExpenseSplit[]> {
    const splitModels = ExpenseSplitMapper.toModelList(splits);
    const savedModels = await this.repository.save(splitModels);
    return ExpenseSplitMapper.toDomainList(savedModels);
  }

  async findByExpenseId(expenseId: string): Promise<ExpenseSplit[]> {
    const splitModels = await this.repository.find({
      where: { expenseId },
    });
    return ExpenseSplitMapper.toDomainList(splitModels);
  }

  async findByUserId(userId: string): Promise<ExpenseSplit[]> {
    const splitModels = await this.repository.find({
      where: { userId },
    });
    return ExpenseSplitMapper.toDomainList(splitModels);
  }

  async deleteByExpenseId(expenseId: string): Promise<void> {
    await this.repository.delete({ expenseId });
  }
}