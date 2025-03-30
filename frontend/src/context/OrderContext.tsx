import { createContext, useContext, useState, useEffect } from "react"
interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
interface OrderContextType {
  order: OrderItem[]
  addToOrder: (item: OrderItem) => void
  removeFromOrder: (id: number) => void
  clearOrder: () => void
}
const OrderContext = createContext<OrderContextType | undefined>(undefined)
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<OrderItem[]>([])
  useEffect(() => {
    const storedOrder = localStorage.getItem("order")
    if (storedOrder) setOrder(JSON.parse(storedOrder))
    console.log("Заказы из localStorage:", storedOrder)
  }, [])
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order))
  }, [order])
  const addToOrder = (item: OrderItem) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((orderItem) => orderItem.id === item.id)
      if (existingItem) {
        return prevOrder.map((orderItem) =>
            orderItem.id === item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
        )
      } else {
        return [...prevOrder, { ...item, quantity: 1 }]
      }
    })
  }
  const removeFromOrder = (id: number) => {
    setOrder((prevOrder) => {
        return prevOrder
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      })
  }
  const clearOrder = () => {
    setOrder([])
  }
  return (
    <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  )
}
export const useOrder = () => {
  const context = useContext(OrderContext)
  if (!context) throw new Error("useOrder must be used within an OrderProvider")
  return context
}