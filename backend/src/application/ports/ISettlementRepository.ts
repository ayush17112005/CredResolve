import { Settlement } from "../../domain/entities/Settlement.js";

export interface ISettlementRepository {
  create(settlement: Settlement): Promise<Settlement>;
  findById(id: string): Promise<Settlement | null>;
  findByGroupId(groupId: string): Promise<Settlement[]>;
  findByUserId(userId: string): Promise<Settlement[]>; // Settlements involving user
}
