import { ExpenseSplit } from '../../../domain/entities/ExpenseSplit.js';
import { ExpenseSplitModel } from '../models/ExpenseSplitModel.js';

export class ExpenseSplitMapper {
  static toDomain(model: ExpenseSplitModel): ExpenseSplit {
    return new ExpenseSplit(
      model.id,
      model.expenseId,
      model.userId,
      Number(model.amount),
      model.percentage ?  Number(model.percentage) : undefined,
      model.createdAt
    );
  }

  static toModel(domain: ExpenseSplit): ExpenseSplitModel {
    const model = new ExpenseSplitModel();
    model.id = domain.id;
    model.expenseId = domain.expenseId;
    model.userId = domain.userId;
    model.amount = domain. amount;
    model.percentage = domain.percentage;
    model. createdAt = domain.createdAt;
    return model;
  }

  static toDomainList(models: ExpenseSplitModel[]): ExpenseSplit[] {
    return models. map((model) => this.toDomain(model));
  }

  static toModelList(domains: ExpenseSplit[]): ExpenseSplitModel[] {
    return domains.map((domain) => this.toModel(domain));
  }
}