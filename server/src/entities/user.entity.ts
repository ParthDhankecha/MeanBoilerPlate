import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { default: '', length: 100 })
  full_name: string;

  @Column('varchar', { default: '', length: 400 })
  email: string;

  @Column('varchar', { default: '', length: 32 })
  password: string;

  @Column('bigint', { default: 0 })
  mobile: number;

  @Column('text', { default: '' })
  reset_token: string;

  @Index('role_id')
  @Column('int', { default: 0 })
  role: number;

  @Index('role_giver_id')
  @Column('int', { default: 0 })
  role_giver: number;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  added_date: Date;

  @Column('int', { default: 0 })
  attempt_count: number;
}
