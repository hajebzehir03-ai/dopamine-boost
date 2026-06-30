import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { useBudget } from '@/hooks/useBudget'
import { formatEuro } from '@/utils/formatters'

export function BudgetBar() {
  const { remaining, percent } = useBudget()
  const isOver = percent >= 100

  return (
    <div className="px-4 py-2 bg-[var(--color-card)] border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-[var(--color-text-muted)] flex items-center gap-1">
          <Wallet size={12} /> Budget oggi
        </span>
        <span className={`text-xs font-bold ${isOver ? 'text-[var(--color-flash)]' : 'text-[var(--color-text)]'}`}>
          {isOver ? 'Budget esaurito per oggi' : `${formatEuro(remaining)} rimasti`}
        </span>
      </div>
      <div className="h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, percent)}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${isOver ? 'bg-[var(--color-flash)]' : 'bg-[var(--color-primary)]'}`}
        />
      </div>
    </div>
  )
}
