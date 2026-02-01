
import { useState } from "react"
import { Link } from "react-router-dom"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Loader2, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const { login } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.login(formData)
      console.log("LOGIN RESPONSE:", response)

      const loginData = response.data || response
      const token = loginData.token

      if (!token) {
        toast.error("No token received from server")
        return
      }

      // Store role information in localStorage for frontend use
      const userRole = loginData.role || 'ROLE_USER'
      localStorage.setItem('userRole', userRole)
      localStorage.setItem('userId', loginData.id || '')
      localStorage.setItem('userEmail', loginData.email || '')
      localStorage.setItem('firstName', loginData.firstName || '')
      localStorage.setItem('lastName', loginData.lastName || '')

      console.log('[Stored role:', userRole)

      login(token)
      toast.success("Welcome back!")
      window.location.href = "/"
    } catch (error) {
      console.log("Login error:", error)
      toast.error("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mb-4">
                <h2 className="text-2xl font-serif font-semibold tracking-wide text-primary">
                  Del Rio
                </h2>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Stay & Resort
                </p>
              </div>

              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Access your account to manage your booking
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="su@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                  you don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign Up Now!
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

