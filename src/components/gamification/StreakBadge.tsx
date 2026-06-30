import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useStreak } from '@/hooks/useStreak'

export function StreakBadge() {
  const { streak } = useStreak()
  if (streak === 0) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="flex items-center gap-1.5 bg-[var(--color-accent)] text-[var(--color-text)] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm"
    >
      <Flame size={16} className="text-orange-500 fire-shake" />
      <span>{streak} giorni di fila!</span>
    </motion.div>
  )
}
