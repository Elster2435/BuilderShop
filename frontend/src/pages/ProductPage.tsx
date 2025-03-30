import { useOrder } from "../context/OrderContext"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
}
const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const { addToOrder } = useOrder()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`)
        if (!response.ok) throw new Error("Ошибка загрузки товара")
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])
  if (loading) return <p>Загрузка...</p>
  if (!product) return <p>Товар не найден</p>
  return (
    <div className="container mx-auto p-4">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>Цена: {product.price} ₽</p>
      <p>{product.description}</p>
      <button
        onClick={() => addToOrder({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })}
        className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
      >
        Добавить в корзину
      </button>
    </div>
  )
}
export default ProductPage