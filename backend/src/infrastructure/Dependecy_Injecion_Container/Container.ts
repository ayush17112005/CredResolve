import { UserRepository } from '../database/repositories/UserRepository.js';
import { GroupRepository } from '../database/repositories/GroupRepository.js';
import { ExpenseRepository } from '../database/repositories/ExpenseRepository.js';
import { ExpenseSplitRepository } from '../database/repositories/ExpenseSplitRepository.js';
import { BalanceRepository } from '../database/repositories/BalanceRepository.js';
import { CreateUserUseCase } from '../../application/use-cases/users/CreateUserUseCase.js';
import { GetUserUseCase } from '../../application/use-cases/users/GetUserUserCase.js';
import { CreateExpenseUseCase } from '../../application/use-cases/expense/CreateExpenseUseCase.js';
import { GetGroupExpensesUseCase } from '../../application/use-cases/expense/GetGroupExpensesUseCase.js';
import { GetGroupBalancesUseCase } from '../../application/use-cases/balance/GetGroupBalancesUseCase.js';
import { GetUserBalancesUseCase } from '../../application/use-cases/balance/GetUserBalancesUseCase.js';
import { CreateSettlementUseCase } from '../../application/use-cases/settlement/CreateSettlementUseCase.js';
import { GetGroupSettlementsUseCase } from '../../application/use-cases/settlement/GetGroupSettlementsUseCase.js';
import { SettlementRepository } from '../database/repositories/SettlementRepository.js';
import { CreateGroupUseCase } from '../../application/use-cases/group/CreateGroupUseCase.js';
import { AddMemberToGroupUseCase } from '../../application/use-cases/group/AddMemberToGroupUseCase.js';
import { GetGroupUseCase } from '../../application/use-cases/group/GetGroupUseCase.js';

export class Container {
  // Repositories
  private static userRepository = new UserRepository();
  private static groupRepository = new GroupRepository();
  private static expenseRepository = new ExpenseRepository();
  private static expenseSplitRepository = new ExpenseSplitRepository();
  private static balanceRepository = new BalanceRepository();
  private static settlementRepository = new SettlementRepository();

  // User Use Cases
  static getCreateUserUseCase(): CreateUserUseCase {
    return new CreateUserUseCase(this.userRepository);
  }

  static getGetUserUseCase(): GetUserUseCase {
    return new GetUserUseCase(this. userRepository);
  }

  // Group Use Cases
  static getCreateGroupUseCase(): CreateGroupUseCase {
    return new CreateGroupUseCase(this.groupRepository, this.userRepository);
  }

  static getAddMemberToGroupUseCase(): AddMemberToGroupUseCase {
    return new AddMemberToGroupUseCase(this. groupRepository, this.userRepository);
  }

  static getGetGroupUseCase(): GetGroupUseCase {
    return new GetGroupUseCase(this.groupRepository);
  }

  // Expense Use Cases
  static getCreateExpenseUseCase(): CreateExpenseUseCase {
    return new CreateExpenseUseCase(
      this.expenseRepository,
      this.groupRepository,
      this.expenseSplitRepository,
      this.balanceRepository
    );
  }

  static getGetGroupExpensesUseCase(): GetGroupExpensesUseCase {
    return new GetGroupExpensesUseCase(this.expenseRepository, this. groupRepository);
  }

  // Balance Use Cases
  static getGetGroupBalancesUseCase(): GetGroupBalancesUseCase {
    return new GetGroupBalancesUseCase(this.balanceRepository, this.groupRepository);
  }

  static getGetUserBalancesUseCase(): GetUserBalancesUseCase {
    return new GetUserBalancesUseCase(this. balanceRepository, this.userRepository);
  }

  // Settlement Use Cases
  static getCreateSettlementUseCase(): CreateSettlementUseCase {
    return new CreateSettlementUseCase(
      this.settlementRepository,
      this.balanceRepository,
      this.groupRepository
    );
  }

  static getGetGroupSettlementsUseCase(): GetGroupSettlementsUseCase {
    return new GetGroupSettlementsUseCase(this.settlementRepository, this.groupRepository);
  }
}