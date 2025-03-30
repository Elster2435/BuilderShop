import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else {
      setLoading(false)
    }
  }, [user, navigate])
  if (loading) {
    return <p className="text-center text-xl">Загрузка...</p>
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>
      <p>Имя пользователя: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button 
        onClick={logout} 
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Выйти
      </button>
    </div>
  )
}
export default ProfilePage