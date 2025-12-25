import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { GroupModel } from './GroupModel.js';
import { UserModel } from './UserModel.js';
import { ExpenseSplitModel } from './ExpenseSplitModel.js';
import { SplitType } from '../../../domain/enums/SplitType.js';
import { ExpenseCategory } from '../../../domain/enums/ExpenseCategory.js';

@Entity('expenses')
export class ExpenseModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId!: string;

  @Column({ type: 'varchar', length: 500 })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({
    type: 'enum',
    enum: ExpenseCategory,
  })
  category!: ExpenseCategory;

  @Column({ name: 'paid_by', type: 'uuid' })
  paidBy! : string;

  @Column({
    name: 'split_type',
    type: 'enum',
    enum: SplitType,
  })
  splitType!: SplitType;

  @Column({ name: 'expense_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expenseDate!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => GroupModel, (group) => group.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group!: GroupModel;

  @ManyToOne(() => UserModel, (user) => user.paidExpenses)
  @JoinColumn({ name: 'paid_by' })
  payer!: UserModel;

  @OneToMany(() => ExpenseSplitModel, (split) => split.expense)
  splits!: ExpenseSplitModel[];
}