import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { GroupModel } from './GroupModel.js';
import { UserModel } from './UserModel.js';

@Entity('settlements')
@Check('"paid_by" != "paid_to"')
@Check('"amount" > 0')
export class SettlementModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId!: string;

  @Column({ name: 'paid_by', type: 'uuid' })
  paidBy!: string;

  @Column({ name: 'paid_to', type: 'uuid' })
  paidTo!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ name: 'settlement_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  settlementDate!: Date;

  @CreateDateColumn({ name:  'created_at' })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => GroupModel, (group) => group.settlements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group!: GroupModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'paid_by' })
  payer!: UserModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name:  'paid_to' })
  payee!: UserModel;
}