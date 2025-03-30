import { useEffect, useState } from "react"

export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: { id: number; name: string }
}
const API_URL = "http://localhost:3000/products"
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Ошибка загрузки товаров")
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  return { products, loading, error }
}
