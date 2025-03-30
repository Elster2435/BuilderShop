import { useState } from "react"
import { useProducts } from "../hooks/useProducts"
import { Link } from "react-router-dom"

const ProductsPage = () => {
  const { products, loading, error } = useProducts()
  const [search, setSearch] = useState("")
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  if (loading) return <p>Загрузка...</p>
  if (error) return <p className="text-red-500">{error}</p>
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Товары</h1>
      <input
        type="text"
        placeholder="Поиск товаров..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="product-flex">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <h2 className="text-lg font-semibold">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">{product.price} ₽</p>
            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 block">
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductsPage