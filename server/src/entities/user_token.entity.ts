import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User_token {
  @PrimaryColumn('int')
  user_id: number;

  @Column('varchar', { length: 1500 })
  access_token: string;

  @Column('varchar', { length: 1500 })
  refresh_token: string;

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
