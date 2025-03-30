import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface Product {
  id: number
  name: string
  price: number
  image: string
}
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchQuery, products])
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/products`)
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error)
    }
    setLoading(false)
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
      <div className="banner">
        <h2>Скидки до 20% на все товары!</h2>
        <p>Не упустите возможность купить товары по сниженным ценам!</p>
        <Link to="/products" className="banner-button">Перейти к товарам</Link>
      </div>
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {loading && <p>Загрузка...</p>}
      {searchQuery.length >= 3 && (
        <div className="product-flex">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-image" />
              </Link>
              <h2 className="text-lg font-semibold">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h2>
              <p className="font-bold mt-2">{product.price} ₽</p>
              <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 block">
                Подробнее
              </Link>
            </div>
          ))}
        </div>
        
      )}
    </div>
  )
}
export default HomePage