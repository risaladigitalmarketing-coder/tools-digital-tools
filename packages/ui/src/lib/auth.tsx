import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  picture: string
  usageCount: number
  isPro: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  loginWithGoogle: () => Promise<void>
  logout: () => void
  incrementUsage: (toolId: string) => boolean
  canUseTool: (toolId: string) => boolean
  getUsageCount: (toolId: string) => number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'risala_tools_auth'
const USAGE_KEY = 'risala_tools_usage'

// Mock Google OAuth - in production, use Firebase Auth, NextAuth, or Supabase
const mockGoogleLogin = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user_' + Date.now(),
        email: 'user@gmail.com',
        name: 'Demo User',
        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        usageCount: 0,
        isPro: false
      })
    }, 1000)
  })
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const newUser = await mockGoogleLogin()
      setUser(newUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const getUsageCount = (toolId: string): number => {
    const usage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}')
    return usage[toolId] || 0
  }

  const canUseTool = (toolId: string): boolean => {
    if (!user) {
      // Anonymous users get 1 free use per tool
      return getUsageCount(toolId) < 1
    }
    // Logged in free users get 5 uses per day per tool
    if (!user.isPro) {
      return getUsageCount(toolId) < 5
    }
    // Pro users unlimited
    return true
  }

  const incrementUsage = (toolId: string): boolean => {
    if (!canUseTool(toolId)) return false
    
    const usage = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}')
    usage[toolId] = (usage[toolId] || 0) + 1
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage))
    return true
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, incrementUsage, canUseTool, getUsageCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Hook for protecting AI tools
export function useAITool(toolId: string) {
  const { user, loading, loginWithGoogle, incrementUsage, canUseTool, getUsageCount } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [generating, setGenerating] = useState(false)

  const executeWithAuth = async (action: () => Promise<void>) => {
    if (loading) return

    if (!canUseTool(toolId)) {
      setShowAuthModal(true)
      return
    }

    setGenerating(true)
    try {
      await action()
      incrementUsage(toolId)
    } finally {
      setGenerating(false)
    }
  }

  const remainingUses = user?.isPro ? Infinity : (user ? 5 : 1) - getUsageCount(toolId)

  return {
    user,
    loading,
    generating,
    showAuthModal,
    setShowAuthModal,
    executeWithAuth,
    remainingUses: Math.max(0, remainingUses),
    canUse: canUseTool(toolId),
    loginWithGoogle
  }
}