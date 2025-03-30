import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Product } from "./models/Product"
import { Category } from "./models/Category"
import { Order } from "./models/Order"
import { OrderItem } from "./models/OrderItem"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "SosochkaElster",
  password: "E@lstr!512@",
  database: "online_shop",
  synchronize: true,
  logging: true,
  entities: [User, Product, Category, Order, OrderItem],
})
