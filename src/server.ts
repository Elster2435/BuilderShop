import express from "express"
import { AppDataSource } from "./data-source"
import productRoutes from "./routes/product.routes"
import userRoutes from "./routes/user.routes"
import categoryRoutes from "./routes/category.routes"
import orderRoutes from "./routes/order.routes"
import orderItemRoutes from "./routes/orderItem.routes"
import authRoutes from "./routes/auth"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use("/products", productRoutes)
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/order", orderRoutes)
app.use("/orderItem", orderItemRoutes)
app.use("/auth", authRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log("📡 Database connected!")

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => console.log("❌ Error connecting to DB:", error))
