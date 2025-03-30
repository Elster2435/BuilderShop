import { useOrder } from "../context/OrderContext"

const OrderPage = () => {
  const { order, removeFromOrder, clearOrder } = useOrder()

  if (order.length === 0) return <p className="text-center text-xl">Нет заказов</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Заказы</h1>
      {order.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b p-4">
          <img src={item.image} alt={item.name} className="product-image" />
          <div>
            <h2 className="text-lg">{item.name}</h2>
            <p>{item.price} ₽ × {item.quantity}</p>
          </div>
          <button onClick={() => removeFromOrder(item.id)} className="text-red-500">Удалить</button>
        </div>
      ))}
      <button onClick={clearOrder} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Очистить заказы</button>
    </div>
  )
}

export default OrderPage
  