import type { Request, Response, NextFunction } from 'express';
import { Container } from '../../../infrastructure/Dependecy_Injecion_Container/Container.js';

export class BalanceController {
  async getGroupBalances(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container.getGetGroupBalancesUseCase();
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

  async getUserBalances(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container.getGetUserBalancesUseCase();
      const {userId} = req.params;
      if(!userId){
        throw new Error('User ID is required');
      }
      const result = await useCase.execute(userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}