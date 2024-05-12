export const USERS_ENDPOINT: string = '/users'

export type UserSettings = {
  colorTheme: 'light' | 'dark' | 'system'
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  isSeller: boolean
  resetToken?: string
  pictureURL: string
  settings: UserSettings
}

export interface UserStore {
  userData: User | null
  setUserData: (user: User | null) => void
  updateUserData: (user: User | null) => void
  removeUserData: () => void
}