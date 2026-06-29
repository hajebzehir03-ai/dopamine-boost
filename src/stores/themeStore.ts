import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeName } from '@/types/theme'
import { themes, applyTheme } from '@/styles/themes'

interface ThemeStore {
  themeName: ThemeName
  setTheme: (name: ThemeName) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeName: 'shein',
      setTheme: (name) => {
        applyTheme(themes[name])
        set({ themeName: name })
      },
    }),
    { name: 'cartrush-theme' }
  )
)
