import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source"
import { User } from "../models/User"

const router = Router()
const userList = AppDataSource.getRepository(User)
const JWT_SECRET = "секретный_ключ"
router.post("/register", async (req, res: any) => {
  try {
    const { username, email, password } = req.body
    const similarUser = await userList.findOneBy({ email })
    if (similarUser) return res.status(400).json({ message: "Пользователь уже существует" })
    const hashedPassword = await bcrypt.hash(password, 10)
    const userNew = userList.create({ username, email, password: hashedPassword })
    await userList.save(userNew)
    const token = jwt.sign({ id: userNew.id, email: userNew.email }, JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ user: userNew, token })
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" })
  }
})
router.post("/login", async (req, res: any) => {
    try {
      const { email, password } = req.body
      const user = await userList.findOneBy({ email })
      if (!user) return res.status(400).json({ message: "Неверный email или пароль" })
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) return res.status(400).json({ message: "Неверный email или пароль" })
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })
      res.json({ user, token })
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" })
    }
  })
router.get("/profile", async (req, res: any) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Нет доступа" })
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await userList.findOneBy({ id: decoded.id })
    if (!user) return res.status(404).json({ message: "Пользователь не найден" })
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" })
  }
})
export default router