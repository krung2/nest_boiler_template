import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export default class User {
  @PrimaryColumn()
  id: string;

  @Column({
    select: false,
  })
  pw: string;

  @Column()
  name: string;
}
