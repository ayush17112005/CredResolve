import { Expense } from '../../../domain/entities/Expense.js';
import { ExpenseModel } from '../models/ExpenseModel.js';

export class ExpenseMapper {
  static toDomain(model: ExpenseModel): Expense {
    return new Expense(
      model.id,
      model.groupId,
      model.description,
      Number(model.amount), // Convert DECIMAL to number
      model.category,
      model.paidBy,
      model.splitType,
      model.createdAt,
      model.updatedAt
    );
  }

  static toModel(domain:  Expense): ExpenseModel {
    const model = new ExpenseModel();
    model.id = domain.id;
    model.groupId = domain.groupId;
    model.description = domain.description;
    model.amount = domain.amount;
    model.category = domain.category;
    model.paidBy = domain.paidBy;
    model.splitType = domain.splitType;
    model.createdAt = domain.createdAt;
    model.updatedAt = domain.updatedAt;
    return model;
  }

  static toDomainList(models: ExpenseModel[]): Expense[] {
    return models.map((model) => this.toDomain(model));
  }
}