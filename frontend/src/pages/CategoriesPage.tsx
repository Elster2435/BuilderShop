import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface Category {
  id: number
  name: string
}
interface Product {
  id: number
  name: string
  price: number
}
const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  useEffect(() => {
    fetchCategories()
  }, [])
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/category")
      const data = await response.json()
      console.log("Категории загружены:", data)
      setCategories(data)
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error)
    }
  }
  const fetchProducts = async (categoryId: number) => {
    setLoading(true)
    setSelectedCategory(categoryId)
    try {
      const response = await fetch(`http://localhost:3000/products?category=${categoryId}`)
      const data = await response.json()
      console.log("Загруженные товары:", data)
      setProducts(data)
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error)
    }
    setLoading(false)
  }
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <h1>Категории товаров</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => fetchProducts(category.id)} style={{ cursor: "pointer" }}>
            {category.name}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>Товары категории</h2>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <ul>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </li>
                ))
              ) : (
                <p>В этой категории пока нет товаров.</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
export default CategoryPage