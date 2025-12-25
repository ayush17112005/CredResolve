import { Repository } from "typeorm";
import { type IUserRepository } from "../../../application/ports/IUserRepository.js";
import { User } from "../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";
import { UserMapper } from "../mappers/UserMapper.js";
import { AppDataSource } from "../config/database.config.js";

export class UserRepository implements IUserRepository{
    private repository: Repository<UserModel>;

    constructor(){
        this.repository = AppDataSource.getRepository(UserModel);
    }

    async create(user: User): Promise<User>{
        const userModel = UserMapper.toModel(user);
        const savedModel =  await this.repository.save(userModel);
        return UserMapper.toDomain(savedModel);
    }

    async findById(id: string): Promise<User | null> {
        const userModel = await this.repository.findOne({where: {id}});
        return userModel ? UserMapper.toDomain(userModel) : null;
    }

    async findByEmail(email:string): Promise<User | null>{
        const userModel = await this.repository.findOne({where: {email}});
        return userModel ? UserMapper.toDomain(userModel) : null;
    }

    async findAll(): Promise<User[]> {
        const userModels = await this.repository.find();
        return UserMapper.toDomainList(userModels);
    }

    async update(user : User): Promise<User> {
        const userModel = UserMapper.toModel(user);
        const updatedModel = await this.repository.save(userModel);
        return UserMapper.toDomain(updatedModel);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}