export interface User {
  id: string
  username: string
  password: string
  displayName: string
  relationship: string
  wishlistOrder: string[]
}

export type AuthUser = Omit<User, 'password'>
