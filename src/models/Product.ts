import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Category } from "./Category"

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column("decimal", { precision: 10, scale: 2 })
  price: number

  @Column()
  description: string

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => Category, (category) => category.products, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category

  constructor(id: number, name: string, price: number, description: string, image: string, category: Category) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.image = image
    this.category = category
  }
}
