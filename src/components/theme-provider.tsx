import { useEffect } from 'react'
import { useThemeStore } from '@/store'
import { ThemeProviderProps } from '@utils/types/theme.types'

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }
    root.classList.add(theme)
  }, [theme])

  return children
}
