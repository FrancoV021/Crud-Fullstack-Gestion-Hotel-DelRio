import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)

        // 🔐 ROL DESDE EL TOKEN
        const roleFromToken = decoded.role || 'ROLE_USER'
        const isAdmin = roleFromToken === 'ROLE_ADMIN'

        setUser({
          email: decoded.sub,
          roles: [{ name: roleFromToken }],
          isAdmin,
        })

        setToken(storedToken)
      } catch (error) {
        console.error('Token inválido', error)
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
      }
    }

    setLoading(false)
  }, [])

  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken)

    const decoded = jwtDecode(jwtToken)

    const roleFromToken = decoded.role || 'ROLE_USER'
    const isAdmin = roleFromToken === 'ROLE_ADMIN'

    setUser({
      email: decoded.sub,
      roles: [{ name: roleFromToken }],
      isAdmin,
    })

    setToken(jwtToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
