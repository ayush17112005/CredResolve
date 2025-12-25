import { Repository } from 'typeorm';
import { type IExpenseRepository } from '../../../application/ports/IExpenseRepository.js';
import { Expense } from '../../../domain/entities/Expense.js';
import { ExpenseModel } from '../models/ExpenseModel.js';
import { ExpenseMapper } from '../mappers/ExpenseMapper.js';
import { AppDataSource } from '../config/database.config.js';

export class ExpenseRepository implements IExpenseRepository {
  private repository: Repository<ExpenseModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(ExpenseModel);
  }

  async create(expense: Expense): Promise<Expense> {
    const expenseModel = ExpenseMapper.toModel(expense);
    const savedModel = await this.repository.save(expenseModel);
    return ExpenseMapper.toDomain(savedModel);
  }

  async findById(id: string): Promise<Expense | null> {
    const expenseModel = await this.repository.findOne({ where: { id } });
    return expenseModel ? ExpenseMapper.toDomain(expenseModel) : null;
  }

  async findByGroupId(groupId: string): Promise<Expense[]> {
    const expenseModels = await this.repository. find({
      where: { groupId },
      order: { expenseDate: 'DESC' },
    });
    return ExpenseMapper.toDomainList(expenseModels);
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const expenseModels = await this. repository. find({
      where: { paidBy: userId },
      order: { expenseDate: 'DESC' },
    });
    return ExpenseMapper.toDomainList(expenseModels);
  }

  async update(expense:  Expense): Promise<Expense> {
    const expenseModel = ExpenseMapper.toModel(expense);
    const updatedModel = await this.repository.save(expenseModel);
    return ExpenseMapper.toDomain(updatedModel);
  }

  async delete(id: string): Promise<void> {
    await this. repository.delete(id);
  }
}