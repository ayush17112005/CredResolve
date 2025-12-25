import { Settlement } from '../../../domain/entities/Settlement.js';
import { SettlementModel } from '../models/SettlementModel.js';

export class SettlementMapper {
  static toDomain(model: SettlementModel): Settlement {
    return new Settlement(
      model.id,
      model.groupId,
      model.paidBy,
      model.paidTo,
      Number(model.amount),
      model.settlementDate,
      model.createdAt
    );
  }

  static toModel(domain: Settlement): SettlementModel {
    const model = new SettlementModel();
    model.id = domain.id;
    model.groupId = domain.groupId;
    model.paidBy = domain.paidBy;
    model.paidTo = domain.paidTo;
    model.amount = domain.amount;
    model.settlementDate = domain.settlementDate;
    model.createdAt = domain.createdAt;
    return model;
  }

  static toDomainList(models: SettlementModel[]): Settlement[] {
    return models.map((model) => this.toDomain(model));
  }
}