import { User } from "../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";

export class UserMapper {
    static toDomain(model: UserModel): User{
        return new User(
            model.id,
            model.name,
            model.email,
            model.phone,
            model.createdAt,
            model.updatedAt
        );
    }

    static toModel(domain: User): UserModel{
        const model =  new UserModel();
        model.id = domain.id;
        model.name = domain.name;
        model.email = domain.email;
        model.phone = domain.phone;
        model.createdAt = domain.createdAt;
        model.updatedAt = domain.updatedAt;
        return model;
    }

    static toDomainList(models: UserModel[]) : User[]{
        return models.map((model) => this.toDomain(model));
    }
}