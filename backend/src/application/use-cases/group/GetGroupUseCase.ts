import { GroupNotFoundException } from "../../../domain/exceptions/GroupNotFoundException.js";
import type { GroupResponseDTO } from "../../dto/CreateGroupDTO.js";
import type { IGroupRepository } from "../../ports/IGroupRepository.js";

export class GetGroupUseCase{
    constructor(
        private groupRepository: IGroupRepository
    ){}

    async execute(groupId: string) : Promise<GroupResponseDTO>{
        //check if group exists
        const group = await this.groupRepository.findById(groupId);
        if(!group){
            throw new GroupNotFoundException(groupId);
        }

        return {
            id: group.id,
            name: group.name,
            description: group.description,
            createdBy: group.createdBy,
            createdAt: group.createdAt
        }
    }
}