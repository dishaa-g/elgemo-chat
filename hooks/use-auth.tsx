"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (data: { token: string; user: User }) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("chat_user")
    const token = localStorage.getItem("chat_token")
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem("chat_user")
        localStorage.removeItem("chat_token")
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(
    (data: { token: string; user: User }) => {
      localStorage.setItem("chat_token", data.token)
      localStorage.setItem("chat_user", JSON.stringify(data.user))
      setUser(data.user)
      router.replace("/chat")
    },
    [router],
  )

  const logout = useCallback(() => {
    localStorage.removeItem("chat_token")
    localStorage.removeItem("chat_user")
    setUser(null)
    router.replace("/login")
  }, [router])

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
