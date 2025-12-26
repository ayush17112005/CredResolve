import { Container } from "../../../infrastructure/Dependecy_Injecion_Container/Container.js";
import {type Request, type Response, type NextFunction} from 'express'
export class UserController{
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const useCase = Container.getCreateUserUseCase();
            const result = await useCase.execute(req.body);
            res.status(201).json({
                sucess: true,
                data: result,
            });
        }
        catch(error){
            next(error);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const useCase = Container.getGetUserUseCase();
            const {id} = req.params;
            if(!id){
                throw new Error('User ID is required');
            }
            const result = await useCase.execute(id);
            res.status(200).json({
                success: true,
                data: result,
            });
        }catch(error){
            next(error);
        }
    }
}