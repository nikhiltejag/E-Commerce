import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(
        () => User
    )
    owner: User

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: string

    @CreateDateColumn()
    created_at: Date
}