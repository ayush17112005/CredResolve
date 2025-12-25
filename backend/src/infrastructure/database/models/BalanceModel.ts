import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
} from 'typeorm';
import { GroupModel } from './GroupModel.js';
import { UserModel } from './UserModel.js';

@Entity('balances')
@Unique(['groupId', 'userId', 'owesTo'])
@Check('"user_id" != "owes_to"')
@Check('"amount" >= 0')
export class BalanceModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @Column({ name: 'owes_to', type: 'uuid' })
  owesTo!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => GroupModel, (group) => group.balances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group!: GroupModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  debtor!: UserModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'owes_to' })
  creditor!: UserModel;
}