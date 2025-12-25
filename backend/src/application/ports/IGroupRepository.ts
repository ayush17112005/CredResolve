import { Group } from "../../domain/entities/Group.js";

export interface IGroupRepository {
  create(group: Group): Promise<Group>;
  findById(id: string): Promise<Group | null>;
  findByUserId(userId: string): Promise<Group[]>; // Get all groups a user is part of
  update(group: Group): Promise<Group>;
  delete(id: string): Promise<void>;
  addMember(groupId: string, userId: string): Promise<void>;
  removeMember(groupId: string, userId: string): Promise<void>;
  isMember(groupId: string, userId: string): Promise<boolean>;
  getMembers(groupId: string): Promise<string[]>; // Returns user IDs
}