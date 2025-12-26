import {v4 as uuidv4} from 'uuid';
import { type IUserRepository } from '../../ports/IUserRepository.js';
import { User } from '../../../domain/entities/User.js';
import { type CreateUserDTO, type UserResponseDTO } from '../../dto/CreateUserDTO.js';
import { DomainException } from '../../../domain/exceptions/DomainException.js';


export class CreateUserUseCase{
    
    constructor(private userRepository: IUserRepository){}

    async execute(dto: CreateUserDTO): Promise<UserResponseDTO>{
        //Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(dto.email)){
            throw new DomainException('Invalid email format');
        }

        //Check if email already exists
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if(existingUser){
            throw new DomainException('User Already Exists');
        }

        //Now create user entity
        const user = new User(
            uuidv4(),
            dto.name,
            dto.email,
            dto.phone
        );

        //Save to the database
        const savedUser = await this.userRepository.create(user);

        //Return response DTO
        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            phone: savedUser.phone,
            createdAt: savedUser.createdAt
        };
    }
}