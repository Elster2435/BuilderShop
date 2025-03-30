import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]

  constructor(id: number, name: string, products: Product[]) {
    this.id = id
    this.name = name
    this.products = products
  }
}
