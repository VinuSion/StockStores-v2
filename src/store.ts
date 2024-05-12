import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UserStore } from '@utils/types/user.types'
import { Theme, ThemeProviderState } from '@utils/types/theme.types'

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        setUserData: (user) => {
          set((state) => ({ ...state, userData: user }))
          useThemeStore.getState().setTheme(user?.settings?.colorTheme || "system")
        },
        updateUserData: (user) => {
          set((state) => ({ ...state, userData: user }))
          useThemeStore.getState().setTheme(user?.settings?.colorTheme || "system")
        },
        removeUserData: () => {
          set({ userData: null })
          useThemeStore.getState().setTheme("system")
        },
      }),
      {
        name: 'user-data',
      }
    )
  )
)

export const useThemeStore = create<ThemeProviderState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        setTheme: (theme: Theme) => {
          set({ theme })
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')
          if (theme === 'system') {
            const systemTheme = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches
              ? 'dark'
              : 'light'
            root.classList.add(systemTheme)
            return
          }
          root.classList.add(theme)
        },
      }),
      {
        name: 'ui-theme',
      }
    )
  )
)
