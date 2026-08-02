import { createContext, useCallback, useMemo, useState } from 'react'
import users from '@/data/users.json'
import type { AuthUser, User } from '@/types/user'

const STORAGE_KEY = 'birthday-invitation:user'

export type AuthStatus = 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  user: AuthUser | null
  status: AuthStatus
  login: (username: string, password: string) => boolean
  logout: () => void
}

function readStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as AuthUser
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

function toAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    relationship: user.relationship,
    wishlistOrder: user.wishlistOrder,
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const login = useCallback((username: string, password: string) => {
    const found = (users as User[]).find(
      (item) =>
        item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password,
    )

    if (!found) return false

    const authUser = toAuthUser(found)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))
    setUser(authUser)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  // derived state — không tạo useState riêng
  const status: AuthStatus = user ? 'authenticated' : 'unauthenticated'

  const value = useMemo(() => ({ user, status, login, logout }), [user, status, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
