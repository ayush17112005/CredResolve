import { Repository } from 'typeorm';
import { type ISettlementRepository } from '../../../application/ports/ISettlementRepository.js';
import { Settlement } from '../../../domain/entities/Settlement.js';
import { SettlementModel } from '../models/SettlementModel.js';
import { SettlementMapper } from '../mappers/SettlementMapper.js';
import { AppDataSource } from '../config/database.config.js';

export class SettlementRepository implements ISettlementRepository {
  private repository: Repository<SettlementModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(SettlementModel);
  }

  async create(settlement:  Settlement): Promise<Settlement> {
    const settlementModel = SettlementMapper.toModel(settlement);
    const savedModel = await this.repository.save(settlementModel);
    return SettlementMapper.toDomain(savedModel);
  }

  async findById(id: string): Promise<Settlement | null> {
    const settlementModel = await this. repository.findOne({ where: { id } });
    return settlementModel ? SettlementMapper. toDomain(settlementModel) : null;
  }

  async findByGroupId(groupId: string): Promise<Settlement[]> {
    const settlementModels = await this.repository.find({
      where: { groupId },
      order: { settlementDate: 'DESC' },
    });
    return SettlementMapper. toDomainList(settlementModels);
  }

  async findByUserId(userId:  string): Promise<Settlement[]> {
    const settlementModels = await this.repository
      .createQueryBuilder('settlement')
      .where('settlement.paid_by = :userId', { userId })
      .orWhere('settlement.paid_to = :userId', { userId })
      .orderBy('settlement.settlement_date', 'DESC')
      .getMany();

    return SettlementMapper. toDomainList(settlementModels);
  }
}