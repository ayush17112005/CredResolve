import { Group } from "../../../domain/entities/Group.js";
import { GroupModel } from "../models/GroupModel.js";

export class GroupMapper{
    static toDomain(model: GroupModel): Group {
        return new Group(
            model.id,
            model.name,
            model.description,
            model.createdBy,
            model.createdAt,
            model.updatedAt
        );
    }

    static toModel(entity: Group) : GroupModel {
        const model = new GroupModel();
        model.id = entity.id;
        model.name = entity.name;
        model.description = entity.description;
        model.createdBy = entity.createdBy;
        model.createdAt = entity.createdAt;
        model.updatedAt = entity.updatedAt;
        return model;
    }

    static toDomainList(models: GroupModel[]): Group[] {
        return models.map((model) => this.toDomain(model));
    }
}