import { v4 as uuidv4 } from 'uuid';
import type { ISettlementRepository } from '../../ports/ISettlementRepository.js';
import type { IBalanceRepository } from '../../ports/IBalanceRepository.js';
import type { IGroupRepository } from '../../ports/IGroupRepository.js';
import { Settlement } from '../../../domain/entities/Settlement.js';
import type { CreateSettlementDTO, SettlementResponseDTO } from '../../dto/CreateSettlementDTO.js';
import { BalanceCalculatorService } from '../../services/BalanceCalculatorService.js';
import { GroupNotFoundException } from '../../../domain/exceptions/GroupNotFoundException.js';

export class CreateSettlementUseCase {
  private balanceCalculator: BalanceCalculatorService;

  constructor(
    private settlementRepository: ISettlementRepository,
    private balanceRepository: IBalanceRepository,
    private groupRepository: IGroupRepository
  ) {
    this.balanceCalculator = new BalanceCalculatorService(balanceRepository);
  }

  async execute(dto: CreateSettlementDTO): Promise<SettlementResponseDTO> {
    // 1. Verify group exists
    const group = await this.groupRepository.findById(dto.groupId);
    if (!group) {
      throw new GroupNotFoundException(dto.groupId);
    }

    // 2. Verify both users are members
    const isPayerMember = await this.groupRepository.isMember(dto.groupId, dto.paidBy);
    const isPayeeMember = await this.groupRepository.isMember(dto.groupId, dto.paidTo);

    if (!isPayerMember || !isPayeeMember) {
      throw new Error('Both users must be members of the group');
    }

    // 3. Validate amount
    if (dto.amount <= 0) {
      throw new Error('Settlement amount must be greater than 0');
    }

    // 4. Verify balance exists
    const balance = await this. balanceRepository.findByUserPair(
      dto.groupId,
      dto.paidBy,
      dto.paidTo
    );

    if (!balance) {
      throw new Error('No balance found between these users');
    }

    if (dto.amount > balance.amount) {
      throw new Error(`Settlement amount (${dto.amount}) cannot exceed balance (${balance.amount})`);
    }

    // 5. Create settlement entity
    const settlement = new Settlement(
      uuidv4(),
      dto.groupId,
      dto.paidBy,
      dto.paidTo,
      dto.amount,
      dto.settlementDate,
      dto.createdAt,
    );

    // 6. Save settlement
    const savedSettlement = await this.settlementRepository. create(settlement);

    // 7. Update balances
    await this.balanceCalculator.updateBalancesForSettlement(
      dto. groupId,
      dto.paidBy,
      dto.paidTo,
      dto.amount
    );

    return {
      id: savedSettlement.id,
      groupId: savedSettlement.groupId,
      paidBy: savedSettlement.paidBy,
      paidTo: savedSettlement.paidTo,
      amount: savedSettlement.amount,
      settlementDate: savedSettlement.settlementDate,
    };
  }
}