import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserModel } from './UserModel.js';
import { ExpenseModel } from './ExpenseModel.js';
import { BalanceModel } from './BalanceModel.js';
import { SettlementModel } from './SettlementModel.js';

@Entity('groups')
export class GroupModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | undefined;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => UserModel, (user) => user.createdGroups)
  @JoinColumn({ name: 'created_by' })
  creator!: UserModel;

  @ManyToMany(() => UserModel)
  @JoinTable({
    name:  'group_members',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  members!: UserModel[];

  @OneToMany(() => ExpenseModel, (expense) => expense.group)
  expenses!: ExpenseModel[];

  @OneToMany(() => BalanceModel, (balance) => balance.group)
  balances!: BalanceModel[];

  @OneToMany(() => SettlementModel, (settlement) => settlement.group)
  settlements!: SettlementModel[];
}