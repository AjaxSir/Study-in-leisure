import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm'
import { User } from './User'
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productName: string

    @Column()
    amount: number

    @Column()
    price: number

    // @ManyToOne(() => User, (user) => user.orders)
    // user: User
}