import type { Request, Response, NextFunction } from 'express';
import { Container } from '../../../infrastructure/Dependecy_Injecion_Container/Container.js';

export class ExpenseController {
  async createExpense(req: Request, res:  Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container. getCreateExpenseUseCase();
      const result = await useCase.execute({
        ... req.body,
        groupId: req.params.id,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroupExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container.getGetGroupExpensesUseCase();
      const {id} = req.params;
      if(!id){
        throw new Error('Group ID is required');
      }
      const result = await useCase.execute(id);

      res.status(200).json({
        success: true,
        data:  result,
      });
    } catch (error) {
      next(error);
    }
  }
}