import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    username: string

    @Column()
    password: string

    @Column({
        default: false
    })
    seller: boolean

    @Column({
        default: ''
    })
    address_street: string

    @Column({
        default: ''
    })
    address_city: string

    @Column({
        default: ''
    })
    address_state: string

    @Column({
        default: ''
    })
    address_country: string

    @Column({
        default: 0
    })
    address_zip: number

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Order, order => order.owner)
    orders: Order[]
}