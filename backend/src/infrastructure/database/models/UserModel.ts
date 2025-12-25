import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GroupModel } from './GroupModel.js';
import { ExpenseModel } from './ExpenseModel.js';

@Entity('users')
export class UserModel {
  @PrimaryColumn('uuid')
  id! : string;

  @Column({ type: 'varchar', length:  255 })
  name!: string;

  @Column({ type: 'varchar', length:  255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string | undefined;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Relations
  @OneToMany(() => GroupModel, (group) => group.creator)
  createdGroups!: GroupModel[];

  @OneToMany(() => ExpenseModel, (expense) => expense.payer)
  paidExpenses!: ExpenseModel[];
}