import { type IGroupRepository } from "../../ports/IGroupRepository.js";
import { type IUserRepository } from "../../ports/IUserRepository.js";
import { type AddMemberDTO } from "../../dto/CreateGroupDTO.js";
import { UserNotFoundException } from "../../../domain/exceptions/UserNotFoundException.js";


export class AddMemberToGroupUseCase{
    constructor(
        private groupRepository: IGroupRepository,
        private userRepository: IUserRepository
    ){}

    async execute(dto: AddMemberDTO): Promise<void>{
        
        //Check if group exists
        const group = await this.groupRepository.findById(dto.groupId);
        if(!group){
            throw new Error(dto.groupId);
        }

        const user = await this.userRepository.findById(dto.userId);
        if(!user){
            throw new UserNotFoundException(dto.userId);
        }

        //Check if already a memeber
        const isMember = await this.groupRepository.isMember(dto.groupId, dto.userId);
        if(isMember){
            throw new Error('User is already a member of this group');
        }

        //Add member
        await this.groupRepository.addMember(dto.groupId, dto.userId);
    }
}