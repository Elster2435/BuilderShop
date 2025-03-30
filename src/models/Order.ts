import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User"
import { OrderItem } from "./OrderItem"

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column("decimal")
  total: number

  @Column()
  status: string
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User
  
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems!: OrderItem[]

  constructor(id: number, total: number, status: string, user: User) {
    this.id = id
    this.total = total
    this.status = status
    this.user = user
  }
}
