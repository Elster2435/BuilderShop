import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import OrderPage from "./pages/OrderPage"
import NotfoundPage from "./pages/NotfoundPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes