import type { IBalanceRepository } from '../../ports/IBalanceRepository.js';
import type { IGroupRepository } from '../../ports/IGroupRepository.js';
import type { BalanceResponseDTO } from '../../dto/BalanceDTO.js';
import { GroupNotFoundException } from '../../../domain/exceptions/GroupNotFoundException.js';

export class GetGroupBalancesUseCase {
  constructor(
    private balanceRepository:  IBalanceRepository,
    private groupRepository: IGroupRepository
  ) {}

  async execute(groupId: string): Promise<BalanceResponseDTO[]> {
    // Verify group exists
    const group = await this.groupRepository. findById(groupId);
    if (!group) {
      throw new GroupNotFoundException(groupId);
    }

    // Get balances
    const balances = await this.balanceRepository.findByGroupId(groupId);

    return balances.map(balance => ({
      id: balance.id,
      groupId: balance.groupId,
      userId: balance.userId,
      owesTo: balance.owesTo,
      amount: balance.amount,
    }));
  }
}