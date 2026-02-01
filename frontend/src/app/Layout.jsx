import React from "react"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <div className="font-sans antialiased min-h-screen">
        {children}
        <Toaster position="top-right" richColors />
      </div>
    </AuthProvider>
  )
}
