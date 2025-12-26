import { type IUserRepository } from "../../ports/IUserRepository.js";
import { type UserResponseDTO } from "../../dto/CreateUserDTO.js";
import { UserNotFoundException } from "../../../domain/exceptions/UserNotFoundException.js";

export class GetUserUseCase{
    constructor(private userRepository: IUserRepository){}

    async execute(userId: string): Promise<UserResponseDTO>{
        const user = await this.userRepository.findById(userId);
        if(!user){
            throw new UserNotFoundException(userId);
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone, 
            createdAt: user.createdAt
        }
    }
}