import {v4 as uuidv4} from "uuid";
import { v4 } from "uuid";
import type { Expense } from "../../domain/entities/Expense.js";
import { ExpenseSplit } from "../../domain/entities/ExpenseSplit.js";
import { SplitType } from "../../domain/enums/SplitType.js";
import { InvalidSplitException } from "../../domain/exceptions/InvalidSplitException.js";
import type { ParticipantDTO } from "../dto/CreateExpenseDTO.js";

export class SplitCalculatorService {
    calculateSplits(
        expenseId: string,
        amount: number,
        splitType: SplitType,
        participants: ParticipantDTO[]
    ) : ExpenseSplit[]{
        switch(splitType){
            case SplitType.EQUAL:
                return this.calculateEqualSplit(expenseId, amount, participants);
            
            case SplitType.EXACT:
                return this.calculateExactSplit(expenseId, amount, participants);
            
            case SplitType.PERCENTAGE:
                return this.calculatePercentageSplit(expenseId, amount, participants);

            default:
                throw new Error(`Unsupported split type: ${splitType}`);
        }
    }

    private calculateEqualSplit(
        expenseId: string,
        amount: number,
        participants: ParticipantDTO[]
    ) : ExpenseSplit[]{
        if(participants.length === 0){
            throw new InvalidSplitException("No participants provided");
        }

        const sharePerson = amount / participants.length;
        return participants.map((participant)  => new ExpenseSplit(
            uuidv4(),
            expenseId,
            participant.userId,
            Number(sharePerson.toFixed(2))
        ))
    }

    private calculateExactSplit(
    expenseId:  string,
    amount: number,
    participants: ParticipantDTO[]
  ): ExpenseSplit[] {
    // Validate:  all participants must have amounts
    const hasAllAmounts = participants.every((p) => p.amount !== undefined);
    if (!hasAllAmounts) {
      throw new InvalidSplitException('All participants must have exact amounts for EXACT split');
    }

    // Validate: sum of amounts must equal total
    const sum = participants.reduce((acc, p) => acc + (p.amount || 0), 0);
    if (Math.abs(sum - amount) > 0.01) { // Allow small floating point errors
      throw new InvalidSplitException(
        `Sum of exact amounts (${sum}) must equal total expense amount (${amount})`
      );
    }

    return participants.map((participant) =>
      new ExpenseSplit(
        uuidv4(),
        expenseId,
        participant.userId,
        participant.amount!
      )
    );
  }
    private calculatePercentageSplit(
    expenseId: string,
    amount: number,
    participants:  ParticipantDTO[]
  ): ExpenseSplit[] {
    // Validate: all participants must have percentages
    const hasAllPercentages = participants.every((p) => p.percentage !== undefined);
    if (!hasAllPercentages) {
      throw new InvalidSplitException('All participants must have percentages for PERCENTAGE split');
    }

    // Validate: percentages must sum to 100
    const totalPercentage = participants. reduce((acc, p) => acc + (p.percentage || 0), 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
      throw new InvalidSplitException(
        `Percentages must sum to 100 (got ${totalPercentage})`
      );
    }

    return participants.map((participant) => {
      const splitAmount = (amount * participant.percentage!) / 100;
      return new ExpenseSplit(
        uuidv4(),
        expenseId,
        participant.userId,
        Number(splitAmount.toFixed(2)),
        participant.percentage
      );
    });
  }
}