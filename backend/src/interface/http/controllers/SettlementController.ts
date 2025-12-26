import type { Request, Response, NextFunction } from 'express';
import { Container } from '../../../infrastructure/Dependecy_Injecion_Container/Container.js';

export class SettlementController {
  async createSettlement(req: Request, res:  Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container. getCreateSettlementUseCase();
      const result = await useCase.execute({
        ...req.body,
        groupId: req.params. id,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroupSettlements(req: Request, res:  Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container. getGetGroupSettlementsUseCase();
      const {id} = req.params;
      if(!id){
        throw new Error('Group ID is required');
      }
      const result = await useCase.execute(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}