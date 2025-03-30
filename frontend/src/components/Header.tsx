import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faShoppingCart, faUser, faHome, faBasketShopping } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header className="bg-orange-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="header-title">
          🛒 BuilderShop
        </Link>
        <div className="flex items-center"> {/* Увеличили отступ и сделали flex */}
          <Link to="/" className="header-link mr-4">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Главная
          </Link>
          <Link to="/category" className="header-link mr-4">
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Категории
          </Link>
          <Link to="/products" className="header-link mr-4">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Товары
          </Link>
          <Link to="/orders" className="header-link mr-4">
            <FontAwesomeIcon icon={faBasketShopping} className="mr-2" />
            Заказы
          </Link>
          <Link to="/profile" className="header-link mr-4">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Профиль
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Header