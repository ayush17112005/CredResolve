export interface BalanceResponseDTO {
  id: string;
  groupId: string;
  userId: string;
  userName?:  string;
  owesTo: string;
  owesToName?: string;
  amount: number;
}

export interface UserBalanceSummaryDTO {
  userId:  string;
  userName?: string;
  totalOwed: number; // What user owes to others
  totalOwing: number; // What others owe to user
  netBalance: number; // Positive = you're owed, Negative = you owe
  balances: BalanceResponseDTO[];
}