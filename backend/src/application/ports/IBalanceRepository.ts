import { Balance } from "../../domain/entities/Balance.js";

export interface IBalanceRepository {
  create(balance: Balance): Promise<Balance>;
  findById(id: string): Promise<Balance | null>;
  findByGroupId(groupId: string): Promise<Balance[]>;
  findByUserId(userId: string): Promise<Balance[]>; // What user owes
  findByCreditorId(creditorId: string): Promise<Balance[]>; // What others owe to this user
  findByUserPair(groupId: string, userId: string, owesTo: string): Promise<Balance | null>;
  update(balance: Balance): Promise<Balance>;
  delete(id: string): Promise<void>;
  deleteByGroupId(groupId: string): Promise<void>; // For balance simplification
}