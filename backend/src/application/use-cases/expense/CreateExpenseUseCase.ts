import {v4 as uuidv4} from 'uuid';
import { GroupNotFoundException } from "../../../domain/exceptions/GroupNotFoundException.js";
import type { CreateExpenseDTO, ExpenseResponseDTO } from "../../dto/CreateExpenseDTO.js";
import type { IExpenseRepository } from "../../ports/IExpenseRepository.js";
import type { IGroupRepository } from "../../ports/IGroupRepository.js";
import { Expense } from '../../../domain/entities/Expense.js';
import type { IExpenseSplitRepository } from '../../ports/IExpenseSplitRepository.js';
import { SplitCalculatorService } from '../../services/SplitCalculatorService.js';
import { BalanceCalculatorService } from '../../services/BalanceCalculatorService.js';
import type { IBalanceRepository } from '../../ports/IBalanceRepository.js';
export class CreateExpenseUseCase{
    private splitCalculator: SplitCalculatorService;
    private balanceCalculator: BalanceCalculatorService;
    constructor(
        private expenseRepository: IExpenseRepository,
        private groupRepository: IGroupRepository, 
        private expenseSplitRepository: IExpenseSplitRepository,
        private balanceRepository: IBalanceRepository
    ){
        this.splitCalculator = new SplitCalculatorService();
        this.balanceCalculator = new BalanceCalculatorService(this.balanceRepository);
    }

    async execute(dto : CreateExpenseDTO) : Promise<ExpenseResponseDTO>{
        //Verify if group exists or not 
        const group = await this.groupRepository.findById(dto.groupId);
        if(!group){
            throw new GroupNotFoundException(dto.groupId);
        }

        //Verify if payer is the member of the group
        const isPayerMember = await this.groupRepository.isMember(dto.groupId, dto.paidBy);

        if(!isPayerMember){
            throw new Error("Payer is not a member of the group");
        }

        //Verify all participants are member of the group
        for(const participant of dto.participants){
            const isMember = await this.groupRepository.isMember(dto.groupId, participant.userId);
            if(!isMember){
                throw new Error(`Participant with ID ${participant.userId} is not a member of the group`);
            }
        }

        //Validate amount
        if(dto.amount <= 0){
            throw new Error("Expense amount must be greater than zero");
        }

        //Create expense
        const expense = new Expense(
            uuidv4(), 
            dto.groupId, 
            dto.description,
            dto.amount,
            dto.category,
            dto.paidBy,
            dto.splitType,
        );

        const savedExpense = await this.expenseRepository.create(expense);

        //Calculate splits based on splitType
        const splits = this.splitCalculator.calculateSplits(
            savedExpense.id,
            dto.amount,
            dto.splitType,
            dto.participants
        );

        //Save splits
        const savedSplits = await this.expenseSplitRepository.createMany(splits);

        //Update Balances
        await this.balanceCalculator.updateBalancesForExpense(
            dto.groupId,
            dto.paidBy,
            savedSplits
        );
        //Return response DTO
        return {
            id: savedExpense.id,
            groupId: savedExpense.groupId,
            description: savedExpense.description,
            amount: savedExpense.amount,
            category: savedExpense.category,
            paidBy: savedExpense.paidBy,
            splitType: savedExpense.splitType,
            splits: savedSplits.map(split => ({
                userId: split.userId,
                amount: split.amount,
                percentage: split.percentage,
            }))
        }
    }
}