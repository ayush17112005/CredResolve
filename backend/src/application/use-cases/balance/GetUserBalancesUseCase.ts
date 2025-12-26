import type { IBalanceRepository } from '../../ports/IBalanceRepository.js';
import type { IUserRepository } from '../../ports/IUserRepository.js';
import type { UserBalanceSummaryDTO } from '../../dto/BalanceDTO.js';
import { UserNotFoundException } from '../../../domain/exceptions/UserNotFoundException.js';
export class GetUserBalancesUseCase {
  constructor(
    private balanceRepository:  IBalanceRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<UserBalanceSummaryDTO> {
    // Verify user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }

    // Get what user owes (debts)
    const debts = await this.balanceRepository.findByUserId(userId);
    const totalOwed = debts.reduce((sum, balance) => sum + balance.amount, 0);

    // Get what others owe to user (credits)
    const credits = await this.balanceRepository.findByCreditorId(userId);
    const totalOwing = credits.reduce((sum, balance) => sum + balance.amount, 0);

    // Calculate net balance
    const netBalance = totalOwing - totalOwed;

    // Combine all balances
    const allBalances = [
      ... debts.map(b => ({
        id: b.id,
        groupId: b.groupId,
        userId: b.userId,
        owesTo: b.owesTo,
        amount: b.amount,
      })),
      ...credits.map(b => ({
        id: b. id,
        groupId: b.groupId,
        userId: b.userId,
        owesTo: b.owesTo,
        amount: b.amount,
      })),
    ];

    return {
      userId: user.id,
      userName: user.name,
      totalOwed,
      totalOwing,
      netBalance,
      balances: allBalances,
    };
  }
}