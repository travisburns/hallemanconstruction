'use client'
import { useState, useEffect } from 'react'
import { authApi } from '../lib/api'
import type { LoginRequest, LoginResponse } from '../lib/types'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<LoginResponse | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const authenticated = authApi.isAuthenticated()
    setIsAuthenticated(authenticated)
    
    if (authenticated) {
      const userData = localStorage.getItem('userData')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    
    setIsLoading(false)
  }

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await authApi.login(credentials)
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('userData', JSON.stringify(response))
      setUser(response)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    authApi.logout()
    localStorage.removeItem('userData')
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  }
}