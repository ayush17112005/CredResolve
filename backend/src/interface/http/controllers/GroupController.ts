import type { Request, Response, NextFunction } from 'express';
import { Container } from '../../../infrastructure/Dependecy_Injecion_Container/Container.js';

export class GroupController {
  async createGroup(req:  Request, res: Response, next:  NextFunction): Promise<void> {
    try {
      const useCase = Container.getCreateGroupUseCase();
      const result = await useCase.execute(req. body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container.getGetGroupUseCase();
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

  async addMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const useCase = Container.getAddMemberToGroupUseCase();
    const { groupId } = req.params
      if(!groupId){
        throw new Error('Group ID is required');
      }
      const {userId} = req.body;
        if(!userId){
            throw new Error('User ID is required');
        }
      await useCase.execute({
        groupId,
        userId
      });

      res.status(200).json({
        success: true,
        message: 'Member added successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}