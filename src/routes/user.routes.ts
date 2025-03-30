import { Router } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/User"
import { UserDTO } from "../dto/UserDTO"
import { validate } from "class-validator"
import { plainToInstance } from "class-transformer"

const router = Router()
router.get("/", async (req, res) => {
    const userList = AppDataSource.getRepository(User)
    const users = await userList.find()
    res.json(users)
})
router.get("/:id", async (req, res: any) => {
    const userList = AppDataSource.getRepository(User)
    const user = await userList.findOneBy({ id: parseInt(req.params.id) })
    if (!user) return res.status(404).json({ message: "Пользователь не найден" })
    res.json(user)
})
router.post("/", async (req, res: any) => {
    try {
        const userData = plainToInstance(UserDTO, req.body)
        const errors = await validate(userData)
        if (errors.length > 0) {
            return res.status(400).json({ message: "Ошибка валидации", errors })
        }
        const userList = AppDataSource.getRepository(User)
        const similarUsername = await userList.findOneBy({ username: userData.username })
        const similarEmail = await userList.findOneBy({ email: userData.email })
        if (similarUsername) {
            return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
        }
        if (similarEmail) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" })
        }
        const userNew = userList.create({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        })
        await userList.save(userNew)
        res.status(201).json(userNew)
    } 
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(500).json({ message: "Неизвестная ошибка" })
    }
})
router.put("/:id", async (req, res: any) => {
    try {
        const userList = AppDataSource.getRepository(User)
        const user = await userList.findOneBy({ id: parseInt(req.params.id) })
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" })
        }
        const { username, email, password } = req.body
        if (username && username !== user.username) {
            const similarUsername = await userList.findOneBy({ username })
            if (similarUsername) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
        }
        if (email && email !== user.email) {
            const similarEmail = await userList.findOneBy({ email })
            if (similarEmail) {
                return res.status(400).json({ message: "Пользователь с таким email уже существует" })
            }
        }
        user.username = username || user.username
        user.email = email || user.email
        user.password = password || user.password
        await userList.save(user)
        res.json(user)
    } 
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
        res.status(500).json({ message: "Неизвестная ошибка" })
    }
})
router.delete("/:id", async (req, res: any) => {
    const userList = AppDataSource.getRepository(User)
    const user = await userList.findOneBy({ id: parseInt(req.params.id) })  
    if (!user) return res.status(404).json({ message: "Пользователь не найден" })  
    await userList.remove(user)
    res.json({ message: "Пользователь удалён" })
})
export default router