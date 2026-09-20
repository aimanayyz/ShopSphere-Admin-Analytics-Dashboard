import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('shopsphere_user')
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem('shopsphere_user', JSON.stringify(user))
      else localStorage.removeItem('shopsphere_user')
    } catch (err) {
      // ignore
    }
  }, [user])

  const login = ({ email, password }) => {
    if (email === 'admin@shopsphere.com' && password === 'admin123') {
      const account = { name: 'Admin User', email }
      setUser(account)
      navigate('/')
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
