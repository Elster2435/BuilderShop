import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm"
import { Order } from "./Order"
import { Product } from "./Product"

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: "order_id" })
  order: Order

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product

  @Column("int")
  quantity: number

  @Column("decimal")
  price: number

  constructor(id: number, order: Order, product: Product, quantity: number, price: number) {
    this.id = id
    this.order = order
    this.product = product
    this.quantity = quantity
    this.price = price
  }
}
