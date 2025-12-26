import { Router } from 'express';
import { BalanceController } from '../controllers/BalanceController.js';
const router = Router();
const controller = new BalanceController();

// GET /api/balances/user/: userId - Get user balances
router.get('/user/:userId', controller.getUserBalances.bind(controller));

export default router;