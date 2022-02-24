import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    length: 250,
  })
  description: string;

  @CreateDateColumn()
  created_at: string;

  @ManyToMany((type) => User, (user) => user.roles)
  user: User[];
}
