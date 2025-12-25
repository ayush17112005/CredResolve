import { Balance } from '../../../domain/entities/Balance.js';
import { BalanceModel } from '../models/BalanceModel.js';

export class BalanceMapper {
  static toDomain(model: BalanceModel): Balance {
    return new Balance(
      model.id,
      model.groupId,
      model.userId,
      model.owesTo,
      Number(model.amount),
      model.createdAt,
      model.updatedAt
    );
  }

  static toModel(domain: Balance): BalanceModel {
    const model = new BalanceModel();
    model.id = domain.id;
    model.groupId = domain.groupId;
    model.userId = domain.userId;
    model. owesTo = domain.owesTo;
    model.amount = domain.amount;
    model. createdAt = domain.createdAt;
    model.updatedAt = domain.updatedAt;
    return model;
  }

  static toDomainList(models: BalanceModel[]): Balance[] {
    return models.map((model) => this.toDomain(model));
  }
}