export const USERS_ENDPOINT: string = '/users'

export type UserSettings = {
  colorTheme: 'light' | 'dark' | 'system'
}

export type User = {
  _id: string
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
  setUserData: (user: User) => void
  updateUserData: (user: Partial<User>) => void
  removeUserData: () => void
}