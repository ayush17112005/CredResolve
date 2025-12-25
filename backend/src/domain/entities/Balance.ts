export class Balance {
  id: string;
  groupId: string;
  userId: string; // Person who owes
  owesTo: string; // Person who is owed
  amount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    groupId: string,
    userId: string,
    owesTo: string,
    amount: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.groupId = groupId;
    this.userId = userId;
    this.owesTo = owesTo;
    this.amount = amount;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  // Business logic methods
  updateAmount(newAmount: number): void {
    this.amount = newAmount;
    this.updatedAt = new Date();
  }

  reduceAmount(settledAmount: number): void {
    if (settledAmount > this.amount) {
      throw new Error('Settlement amount cannot exceed balance amount');
    }
    this.amount -= settledAmount;
    this.updatedAt = new Date();
  }

  isFullySettled(): boolean {
    return this.amount === 0;
  }

  isValid(): boolean {
    return this. amount >= 0 && this.userId !== this.owesTo;
  }
}