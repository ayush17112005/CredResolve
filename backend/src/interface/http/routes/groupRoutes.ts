import { Router } from 'express';
import { GroupController } from '../controllers/GroupController.js';
import { ExpenseController } from '../controllers/ExpenseController.js';
import { BalanceController } from '../controllers/BalanceController.js';
import { SettlementController } from '../controllers/SettlementController.js';

const router = Router();
const groupController = new GroupController();
const expenseController = new ExpenseController();
const balanceController = new BalanceController();
const settlementController = new SettlementController();

// Group operations
router.post('/', groupController.createGroup.bind(groupController));
router.get('/:id', groupController.getGroup.bind(groupController));
router.post('/:groupId/members', groupController.addMember.bind(groupController));

// Expense operations
router.post('/:id/expenses', expenseController.createExpense.bind(expenseController));
router.get('/:id/expenses', expenseController.getGroupExpenses.bind(expenseController));

// Balance operations
router.get('/:id/balances', balanceController.getGroupBalances.bind(balanceController));

// Settlement operations
router.post('/:id/settlements', settlementController.createSettlement.bind(settlementController));
router.get('/:id/settlements', settlementController.getGroupSettlements.bind(settlementController));

export default router;