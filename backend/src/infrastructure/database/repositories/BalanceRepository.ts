import { Repository } from 'typeorm';
import { type IBalanceRepository } from '../../../application/ports/IBalanceRepository.js';
import { Balance } from '../../../domain/entities/Balance.js';
import { BalanceModel } from '../models/BalanceModel.js';
import { BalanceMapper } from '../mappers/BalanceMapper.js';
import { AppDataSource } from '../config/database.config.js';

export class BalanceRepository implements IBalanceRepository {
  private repository: Repository<BalanceModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(BalanceModel);
  }

  async create(balance: Balance): Promise<Balance> {
    const balanceModel = BalanceMapper.toModel(balance);
    const savedModel = await this. repository.save(balanceModel);
    return BalanceMapper. toDomain(savedModel);
  }

  async findById(id: string): Promise<Balance | null> {
    const balanceModel = await this.repository.findOne({ where: { id } });
    return balanceModel ? BalanceMapper.toDomain(balanceModel) : null;
  }

  async findByGroupId(groupId: string): Promise<Balance[]> {
    const balanceModels = await this. repository. find({
      where: { groupId },
    });
    return BalanceMapper.toDomainList(balanceModels);
  }

  async findByUserId(userId: string): Promise<Balance[]> {
    const balanceModels = await this.repository.find({
      where: { userId },
    });
    return BalanceMapper.toDomainList(balanceModels);
  }

  async findByCreditorId(creditorId: string): Promise<Balance[]> {
    const balanceModels = await this.repository.find({
      where: { owesTo: creditorId },
    });
    return BalanceMapper.toDomainList(balanceModels);
  }

  async findByUserPair(
    groupId: string,
    userId:  string,
    owesTo: string
  ): Promise<Balance | null> {
    const balanceModel = await this.repository.findOne({
      where: { groupId, userId, owesTo },
    });
    return balanceModel ?  BalanceMapper.toDomain(balanceModel) : null;
  }

  async update(balance: Balance): Promise<Balance> {
    const balanceModel = BalanceMapper.toModel(balance);
    const updatedModel = await this.repository.save(balanceModel);
    return BalanceMapper.toDomain(updatedModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByGroupId(groupId: string): Promise<void> {
    await this.repository.delete({ groupId });
  }
}