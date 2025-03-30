import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CategoriesPage from "./pages/CategoriesPage"
import ProductsPage from "./pages/ProductsPage"
import OrderPage from "./pages/OrderPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotfoundPage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./context/AuthContext"
import { OrderProvider } from "./context/OrderContext"

function App() {
  return (
    <OrderProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category" element={<CategoriesPage />} />
          </Routes>
          <Footer  />
        </Router>
      </AuthProvider>
    </OrderProvider>
  )
}
export default App