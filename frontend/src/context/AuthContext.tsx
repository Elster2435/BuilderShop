import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  username: string
  email: string
}
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}
const AuthContext = createContext<AuthContextType | null>(null)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])
  const login = async (email: string, password: string) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (response.ok) {
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
    } else {
      throw new Error(data.message)
    }
  }
  const register = async (username: string, email: string, password: string) => {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await response.json()
    if (response.ok) {
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
    } else {
      throw new Error(data.message)
    }
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}