import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  seller: boolean;

  @Column({
    default: false,
  })
  admin: true;

  @Column({
    default: '',
  })
  address_street: string;

  @Column({
    default: '',
  })
  address_city: string;

  @Column({
    default: '',
  })
  address_state: string;

  @Column({
    default: '',
  })
  address_country: string;

  @Column({
    default: 0,
  })
  address_zip: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Order, (order) => order.owner)
  orders: Order[];

  @ManyToMany((type) => Role, { eager: true })
  @JoinTable()
  roles: Role[];
}
