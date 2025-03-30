import { Router } from "express"
import { AppDataSource } from "../data-source"
import { Category } from "../models/Category"
import { CategoryDTO } from "../dto/CategoryDTO"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"

const router = Router()
router.get("/", async(req, res) => {
  const categories = await AppDataSource.getRepository(Category).find()
  console.log("Категории:", categories)
  res.json(categories)
})
router.post("/", async (req, res: any) => {
  try {
    const categoryData = plainToInstance(CategoryDTO, req.body)
    const errors = await validate(categoryData)
    if (errors.length > 0) {
      return res.status(400).json({ message: "Ошибка валидации", errors })
    }
    const categoryList = AppDataSource.getRepository(Category)
    const similarCategory = await categoryList.findOneBy({ name: categoryData.name })
    if (similarCategory) {
      return res.status(400).json({ message: "Категория с таким названием уже существует" })
    }
    const categoryNew = categoryList.create({ name: categoryData.name })
    await categoryList.save(categoryNew)
    res.status(201).json(categoryNew)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    res.status(500).json({ message: "Неизвестная ошибка" })
  }
})
router.put("/:id", async (req, res: any) => {
  try {
    const categoryList = AppDataSource.getRepository(Category)
    const category = await categoryList.findOneBy({ id: parseInt(req.params.id) })
    if (!category) {
      return res.status(404).json({ message: "Категория не найдена" })
    }
    const { name } = req.body
    if (name && name !== category.name) {
      const similarCategory = await categoryList.findOneBy({ name })
      if (similarCategory) {
        return res.status(400).json({ message: "Категория с таким названием уже существует" })
      }
    }
    category.name = name || category.name
    await categoryList.save(category)
    res.json(category)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    res.status(500).json({ message: "Неизвестная ошибка" })
  }
})
router.delete("/:id", async (req, res: any) => {
    const categoryList = AppDataSource.getRepository(Category)
    const category = await categoryList.findOneBy({ id: parseInt(req.params.id) })
    if (!category) return res.status(404).json({ message: "Категория не найдена" })  
    await categoryList.remove(category)
    res.json({ message: "Категория удалена" })
})
export default router
