
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'sonner'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const decodeToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token)
      console.log('Decoded JWT:', decoded)
      
      if (!decoded?.exp || decoded.exp * 1000 < Date.now()) {
        return null
      }

      const email = decoded.sub || decoded.email
      
      // Get role from localStorage (set during login)
      const storedRole = localStorage.getItem('userRole') || 'ROLE_USER'
      console.log('Stored role from localStorage:', storedRole)
      
      const isAdmin = storedRole === 'ROLE_ADMIN'
      
      const roles = [{
        id: 0,
        name: storedRole
      }]

      return {
        id: decoded.id || localStorage.getItem('userId') || 0,
        firstName: decoded.firstName || localStorage.getItem('firstName') || '',
        lastName: decoded.lastName || localStorage.getItem('lastName') || '',
        email: email,
        roles: roles,
        isAdmin: isAdmin,
      }
    } catch (error) {
      console.error('Token decode error:', error)
      return null
    }
  }, [])

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      const userData = decodeToken(storedToken)

      if (userData) {
        setToken(storedToken)
        setUser(userData)
      } else {
        localStorage.removeItem('token')
      }
    }

    setIsLoading(false)
  }, [decodeToken])

  const login = useCallback(
    (newToken) => {
      const userData = decodeToken(newToken)

      if (!userData) {
        toast.error('Invalid or expired token')
        return false
      }

      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(userData)
      return true
    },
    [decodeToken]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    setToken(null)
    setUser(null)
    window.location.href = "/login"
  }, [])

  const isAdmin = user?.isAdmin ?? false

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user),
        isAdmin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
