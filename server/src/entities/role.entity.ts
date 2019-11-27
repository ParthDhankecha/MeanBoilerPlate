import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { Message } from '../config/messages';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @IsString({ message: new Message().message.EnterRoleName })
  @Length(1, 100, { message: new Message().message.ValidRole })
  @Column('varchar', { length: 100 })
  name: string;

  @IsString({ message: new Message().message.EnterRoleDescription })
  @Length(1, 100, { message: new Message().message.ValidRoleDescription })
  @Column('varchar', { length: 800 })
  description: string;

  @Index('creator_id')
  @Column('int', { default: 0 })
  creator: number;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  added_date: Date;

  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modified_date: Date;
}
