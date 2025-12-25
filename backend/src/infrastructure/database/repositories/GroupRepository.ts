import { Repository } from "typeorm";
import { type IGroupRepository } from "../../../application/ports/IGroupRepository.js";
import { Group } from "../../../domain/entities/Group.js";
import { GroupModel } from "../models/GroupModel.js";
import { UserModel } from "../models/UserModel.js";
import { GroupMapper } from "../mappers/GroupMapper.js";
import { AppDataSource } from "../config/database.config.js";

export class GroupRepository implements IGroupRepository{

    private repository: Repository<GroupModel>;
    private userRepository: Repository<UserModel>;
    constructor(){
        this.repository = AppDataSource.getRepository(GroupModel);
        this.userRepository = AppDataSource.getRepository(UserModel);
    }

    async create(group: Group): Promise<Group> {
        const groupModel = GroupMapper.toModel(group);
        const savedModel = await this. repository.save(groupModel);
        return GroupMapper.toDomain(savedModel);
    }

    async findById(id: string): Promise<Group | null> {
        const groupModel = await this.repository.findOne({ where: { id } });
        return groupModel ? GroupMapper.toDomain(groupModel) : null;
    }
    async findByUserId(userId: string): Promise<Group[]> {
        const groupModels = await this.repository
        .createQueryBuilder('group')
        .innerJoin('group.members', 'member')
        .where('member.id = :userId', { userId })
        .getMany();
        
        return GroupMapper.toDomainList(groupModels);
    }
    async update(group: Group): Promise<Group> {
        const groupModel = GroupMapper.toModel(group);
        const updatedModel = await this.repository.save(groupModel);
        return GroupMapper.toDomain(updatedModel);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async addMember(groupId: string, userId: string): Promise<void>{
        const group = await this.repository.findOne({
            where: {id: groupId},
            relations: ['members'],
        });
        const user = await this.userRepository.findOne({
            where: {id: userId}
        });
        if(!group || !user){
            throw new Error("Group or User not found");
        }

        //check if already a member
        const isMember = group.members.some(member => member.id === userId);
        if(!isMember){
            group.members.push(user);
            await this.repository.save(group);
        }
    }

    async removeMember(groupId: string, userId: string): Promise<void>{
        const group = await this.repository.findOne({
            where: {id: groupId},
            relations: ['members'],
        });

        if(!group){
            throw new Error("Group not found");
        }
        group.members = group.members.filter(member => member.id !== userId);
        await this.repository.save(group);
    }

    async isMember(groupId: string, userId: string): Promise<boolean>{
        const group = await this.repository.findOne({
            where: {id: groupId},
            relations: ['members'],
        });
        if(!group){
            throw new Error("Group not found");
        }
        return group.members.some(member => member.id === userId);
    }

    async getMembers(groupId: string): Promise<string[]>{
        const group = await this.repository.findOne({
            where: {id: groupId},
            relations: ['members'],
        })
        if(!group){
            throw new Error("Group not found");
        }
        return group.members.map(member => member.id);
    }

}