import { motion } from 'framer-motion'
import { useStreak } from '@/hooks/useStreak'

export function StreakBadge() {
  const { streak, emoji } = useStreak()
  if (streak === 0) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="flex items-center gap-1.5 bg-[var(--color-accent)] text-[var(--color-text)] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm"
    >
      <span className="fire-shake">{emoji}</span>
      <span>{streak} giorni di fila!</span>
    </motion.div>
  )
}
