import { Router } from "express"
import { AppDataSource } from "../data-source"
import { OrderItem } from "../models/OrderItem"

const router = Router()
router.get("/", async (req, res) => {
    const itemsList = AppDataSource.getRepository(OrderItem)
    const items = await itemsList.find()
    res.json(items)
})
router.get("/:id", async (req, res: any) => {
    const itemsList = AppDataSource.getRepository(OrderItem)
    const item = await itemsList.findOneBy({ id: parseInt(req.params.id) })
    if (!item) return res.status(404).json({ message: "Элемент заказа не найден" })
    res.json(item)
})
router.post("/", async (req, res: any) => {
    const { order, product, quantity, price } = req.body
    if (!order || !product || !quantity || !price){
        return res.status(400).json({ message: "Необходимо указать все параметры" })
    }
    const itemsList = AppDataSource.getRepository(OrderItem)
    const itemNew = itemsList.create({ order, product, quantity, price })
    await itemsList.save(itemNew)
    res.status(201).json(itemNew)
})
router.put("/:id", async (req, res: any) => {
    const itemsList = AppDataSource.getRepository(OrderItem)
    const item = await itemsList.findOneBy({ id: parseInt(req.params.id) })
    if (!item) return res.status(404).json({ message: "Элемент заказа не найден" })
    const { order, product, quantity, price } = req.body
    item.order = order || item.order
    item.product = product || item.product
    item.quantity = quantity || item.quantity
    item.price = price || item.price
    await itemsList.save(item)
    res.json(item)
})
router.delete("/:id", async (req, res: any) => {
    const itemsList = AppDataSource.getRepository(OrderItem)
    const item = await itemsList.findOneBy({ id: parseInt(req.params.id) })  
    if (!item) return res.status(404).json({ message: "Элемент заказа не найден" })  
    await itemsList.remove(item)
    res.json({ message: "Элемент заказа не найден" })
})
export default router