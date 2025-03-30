import { Router } from "express"
import { AppDataSource } from "../data-source"
import { Order } from "../models/Order"

const router = Router()
router.get("/", async (req, res) => {
    const orderList = AppDataSource.getRepository(Order)
    const orders = await orderList.find()
    res.json(orders)
})
router.get("/:id", async (req, res: any) => {
    const orderList = AppDataSource.getRepository(Order)
    const order = await orderList.findOneBy({ id: parseInt(req.params.id) })
    if (!order) return res.status(404).json({ message: "Заказ не найден" })
    res.json(order)
})
router.post("/", async (req, res: any) => {
    const { total, status, user } = req.body
    if (!total || !status || !user){
        return res.status(400).json({ message: "Необходимо указать все параметры нового заказа" })
    }
    const orderList = AppDataSource.getRepository(Order)
    const orderNew = orderList.create({ total, status, user })
    await orderList.save(orderNew)
    res.status(201).json(orderNew)
})
router.put("/:id", async (req, res: any) => {
    const orderList = AppDataSource.getRepository(Order)
    const order = await orderList.findOneBy({ id: parseInt(req.params.id) })
    if (!order) return res.status(404).json({ message: "Заказ не найден" })
    const { total, status, user } = req.body
    order.total = total || order.total
    order.status = status || order.status
    order.user = user || order.user
    await orderList.save(order)
    res.json(order)
})
router.delete("/:id", async (req, res: any) => {
    const orderList = AppDataSource.getRepository(Order)
    const order = await orderList.findOneBy({ id: parseInt(req.params.id) })  
    if (!order) return res.status(404).json({ message: "Заказ не найден" })  
    await orderList.remove(order)
    res.json({ message: "Заказ удалён" })
})
export default router