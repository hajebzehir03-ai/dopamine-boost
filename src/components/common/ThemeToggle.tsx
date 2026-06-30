import { motion } from 'framer-motion'
import { useThemeStore } from '@/stores/themeStore'
import { themes } from '@/styles/themes'
import type { ThemeName } from '@/types/theme'

export function ThemeToggle() {
  const { themeName, setTheme } = useThemeStore()

  return (
    <div className="flex gap-2">
      {(Object.keys(themes) as ThemeName[]).map((name) => {
        const t = themes[name]
        const isActive = themeName === name
        return (
          <motion.button
            key={name}
            whileTap={{ scale: 0.92 }}
            onClick={() => setTheme(name)}
            aria-pressed={isActive}
            aria-label={`Tema ${t.label}`}
            className={`
              flex flex-col items-center gap-1 px-3 py-2 rounded-[var(--radius-lg)]
              border-2 transition-all duration-200
              ${isActive
                ? 'border-[var(--color-primary)] bg-[var(--color-background-secondary)]'
                : 'border-[var(--color-border)] bg-[var(--color-card)]'
              }
            `}
          >
            <span className="text-xl">{t.emoji}</span>
            <span className={`text-xs font-semibold ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}>
              {t.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
