import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { RelaxStats } from '@/components/gamification/RelaxStats'
import { useBudget } from '@/hooks/useBudget'
import { useStreak } from '@/hooks/useStreak'
import { formatEuro } from '@/utils/formatters'

const PERSIST_KEYS = ['cartrush-orders', 'cartrush-cart', 'cartrush-budget', 'cartrush-streak', 'cartrush-theme']

export function SettingsPage() {
  const { remaining, total } = useBudget()
  const { streak } = useStreak()
  const [confirmDelete, setConfirmDelete] = useState(false)

  function handleClearData() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    PERSIST_KEYS.forEach((k) => localStorage.removeItem(k))
    window.location.reload()
  }

  return (
    <div className="p-4 pb-32 space-y-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold text-[var(--color-text)]"
      >
        Profilo & Impostazioni 👤
      </motion.h1>

      {/* User stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-3xl">
          🛍️
        </div>
        <div>
          <p className="font-bold text-[var(--color-text)]">Shopper Virtuale</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Budget oggi: {formatEuro(remaining)} / {formatEuro(total)}
          </p>
          {streak > 0 && (
            <p className="text-sm text-[var(--color-primary)] font-semibold mt-0.5 flex items-center gap-1"><Flame size={14} aria-hidden="true" /> {streak} giorni di fila!</p>
          )}
        </div>
      </motion.div>

      {/* Theme */}
      <div>
        <h2 className="font-bold text-[var(--color-text)] mb-3">🎨 Stile dell'app</h2>
        <ThemeToggle />
      </div>

      {/* Stats */}
      <RelaxStats />

      {/* Privacy / data management */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="card p-4 space-y-3"
      >
        <h2 className="font-bold text-[var(--color-text)]">🔒 Privacy & Dati</h2>
        <p className="text-xs text-[var(--color-text-muted)]">
          CartRush non invia alcun dato a server esterni. Ordini, carrello e preferenze
          sono salvati <strong>solo su questo dispositivo</strong> (localStorage).
          Puoi cancellare tutto in qualsiasi momento.
        </p>
        <button
          onClick={handleClearData}
          className={`
            w-full py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors
            ${confirmDelete
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-[var(--color-background-secondary)] text-[var(--color-text)] hover:bg-[var(--color-border)]'
            }
          `}
        >
          {confirmDelete ? '⚠️ Conferma: cancella tutti i dati' : '🗑️ Cancella tutti i dati locali'}
        </button>
        {confirmDelete && (
          <button
            onClick={() => setConfirmDelete(false)}
            className="w-full py-1.5 text-xs text-[var(--color-text-muted)] underline"
          >
            Annulla
          </button>
        )}
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card p-4 text-center space-y-1"
      >
        <p className="text-lg font-bold text-[var(--color-text)]">CartRush ⚡</p>
        <p className="text-xs text-[var(--color-text-muted)]">La scarica di adrenalina dello shopping</p>
        <p className="text-xs text-[var(--color-text-muted)]">Senza spendere un centesimo</p>
        <p className="text-xs text-[var(--color-primary)] font-medium mt-2">v1.0.0 — by Zehir Hajeb</p>
      </motion.div>
    </div>
  )
}
