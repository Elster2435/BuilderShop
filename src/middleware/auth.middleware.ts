import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = "секретный_ключ"
interface AuthRequest extends Request {
  user?: any
}
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Нет доступа, токен отсутствует" })
    return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" })
  }
}
export default authMiddleware