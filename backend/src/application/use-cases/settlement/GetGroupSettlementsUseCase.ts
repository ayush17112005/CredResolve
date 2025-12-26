import type { ISettlementRepository } from '../../ports/ISettlementRepository.js';
import type { IGroupRepository } from '../../ports/IGroupRepository.js';
import type { SettlementResponseDTO } from '../../dto/CreateSettlementDTO.js';
import { GroupNotFoundException } from '../../../domain/exceptions/GroupNotFoundException.js';

export class GetGroupSettlementsUseCase {
  constructor(
    private settlementRepository: ISettlementRepository,
    private groupRepository: IGroupRepository
  ) {}

  async execute(groupId: string): Promise<SettlementResponseDTO[]> {
    // Verify group exists
    const group = await this. groupRepository.findById(groupId);
    if (!group) {
      throw new GroupNotFoundException(groupId);
    }

    const settlements = await this.settlementRepository.findByGroupId(groupId);

    return settlements.map(settlement => ({
      id: settlement.id,
      groupId: settlement.groupId,
      paidBy: settlement.paidBy,
      paidTo: settlement.paidTo,
      amount: settlement.amount,
      settlementDate: settlement.settlementDate,
    }));
  }
}