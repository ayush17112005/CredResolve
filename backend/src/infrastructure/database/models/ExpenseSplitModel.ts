import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExpenseModel } from './ExpenseModel.js';
import { UserModel } from './UserModel.js';

@Entity('expense_splits')
export class ExpenseSplitModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name:  'expense_id', type:  'uuid' })
  expenseId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ type:  'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentage?: number | undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => ExpenseModel, (expense) => expense.splits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'expense_id' })
  expense!: ExpenseModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user!: UserModel;
}