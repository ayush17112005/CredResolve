export interface CreateSettlementDTO {
  groupId: string;
  paidBy: string; // User ID who is paying
  paidTo: string; // User ID who is receiving
  amount: number;
  settlementDate: Date;
  createdAt?: Date | undefined;
}

export interface SettlementResponseDTO {
  id: string;
  groupId: string;
  paidBy: string;
  paidByName?: string;
  paidTo: string;
  paidToName?: string;
  amount: number;
  settlementDate: Date;
}