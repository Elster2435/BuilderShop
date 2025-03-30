import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

const RegisterPage = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      navigate("/profile")
    } catch (err) {
      setError("Ошибка регистрации")
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Зарегистрироваться</button>
      </form>
      <p className="mt-4 text-center">Есть аккаунт? <Link to="/login" className="text-blue-500 underline">Войти</Link></p>
    </div>
  )
}
export default RegisterPage