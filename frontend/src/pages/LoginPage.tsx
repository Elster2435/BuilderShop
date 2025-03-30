import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/profile")
    } catch (err) {
      setError("Ошибка авторизации")
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Войти</button>
      </form>
      <p className="mt-4 text-center">Нет аккаунта? <Link to="/register" className="text-blue-500 underline">Зарегистрироваться</Link></p>
    </div>
  )
}
export default LoginPage