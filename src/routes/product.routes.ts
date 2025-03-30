import { Router } from "express"
import { AppDataSource } from "../data-source"
import { Product } from "../models/Product"
import { Category } from "../models/Category"
import { ProductDTO } from "../dto/ProductDTO"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"

const router = Router()
router.get("/", async (req, res) => {
  try {
      const productList = AppDataSource.getRepository(Product)
      const { category } = req.query
      let products
      if (category) {
          products = await productList.find({
              where: { category: { id: Number(category) } },
              relations: ["category"],
          })
      } else {
          products = await productList.find({ relations: ["category"] })
      }
      res.json(products)
  } catch (error) {
      console.error("Ошибка при получении товаров:", error)
      res.status(500).json({ message: "Ошибка сервера" })
  }
})
router.get("/:id", async (req, res: any) => {
    const productList = AppDataSource.getRepository(Product)
    const product = await productList.findOneBy({ id: parseInt(req.params.id) })
    if (!product) return res.status(404).json({ message: "Товар не найден" })
    res.json(product)
})
router.post("/", async (req, res: any) => {
    try {
        const productData = plainToInstance(ProductDTO, req.body)
        const errors = await validate(productData)
        if (errors.length > 0) {
            return res.status(400).json({ message: "Ошибка валидации", errors })
        }
        const categoryList = AppDataSource.getRepository(Category)
        const category = await categoryList.findOneBy({ id: productData.category })

        if (!category) {
            return res.status(400).json({ message: "Указанная категория не найдена" })
        }
        const productList = AppDataSource.getRepository(Product)
        const productNew = productList.create({
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
            category: category,
        })
        await productList.save(productNew)
        res.status(201).json(productNew)
    } catch (error) {
        if (error instanceof Error) {
            if ("code" in error && error.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ message: "Товар с таким именем уже существует" })
            }
            return res.status(500).json({ message: error.message })
        }
        res.status(500).json({ message: "Неизвестная ошибка" })
    }
})
router.put("/:id", async (req, res: any) => {
    try {
      const productData = plainToInstance(ProductDTO, req.body)
      const errors = await validate(productData)
      if (errors.length > 0) {
        return res.status(400).json({ message: "Ошибка валидации", errors })
      }
      const productList = AppDataSource.getRepository(Product)
      const product = await productList.findOneBy({ id: parseInt(req.params.id) })
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" })
      }
      product.name = productData.name || product.name
      product.price = productData.price || product.price
      product.description = productData.description || product.description
      product.image = productData.image || product.image
      if (productData.category) {
        const categoryList = AppDataSource.getRepository(Category)
        const category = await categoryList.findOneBy({ id: productData.category })
        if (!category) {
          return res.status(400).json({ message: "Указанная категория не найдена" })
        }
        product.category = category
      }
      await productList.save(product)
      res.json(product)
    } catch (error) {
      if (error instanceof Error) {
        if ("code" in error && error.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Товар с таким именем уже существует" })
        }
        return res.status(500).json({ message: error.message })
      }
      res.status(500).json({ message: "Неизвестная ошибка" })
    }
  })
router.delete("/:id", async (req, res: any) => {
    const productList = AppDataSource.getRepository(Product)
    const product = await productList.findOneBy({ id: parseInt(req.params.id) })  
    if (!product) return res.status(404).json({ message: "Товар не найден" })  
    await productList.remove(product)
    res.json({ message: "Товар удалён" })
})
export default router