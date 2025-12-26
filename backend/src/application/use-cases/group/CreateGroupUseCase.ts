import {v4 as uuidv4} from 'uuid';
import { type IGroupRepository } from '../../ports/IGroupRepository.js';
import { Group } from '../../../domain/entities/Group.js';
import { type CreateGroupDTO, type GroupResponseDTO } from '../../dto/CreateGroupDTO.js';
import { UserNotFoundException } from '../../../domain/exceptions/UserNotFoundException.js';
import { type IUserRepository } from '../../ports/IUserRepository.js';


export class CreateGroupUseCase{
    
    constructor(private groupRepository: IGroupRepository, private userRepository: IUserRepository){}
    async execute(dto: CreateGroupDTO): Promise<GroupResponseDTO>{
        //Verify if the creater exits
        const creater = await this.userRepository.findById(dto.createdBy);
        if(!creater){
            throw new UserNotFoundException(dto.createdBy);
        }

        //Create group entity
        const group = new Group(
            uuidv4(),
            dto.name,
            dto.description,
            dto.createdBy,
        );

        const savedGroup = await this.groupRepository.create(group);
        //Automatically add creater as a member
        await this.groupRepository.addMember(savedGroup.id, dto.createdBy);
        return {
            id: savedGroup.id,
            name: savedGroup.name,
            description: savedGroup.description,
            createdBy: savedGroup.createdBy,
            createdAt: savedGroup.createdAt
        };
    }
}