import { motion } from 'framer-motion'
import { useOrderStore } from '@/stores/orderStore'
import { formatEuro } from '@/utils/formatters'

export function RelaxStats() {
  const { orders, totalSpent, totalOrders } = useOrderStore()

  const weeklySpent = orders
    .filter((o) => {
      const orderDate = new Date(o.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return orderDate > weekAgo
    })
    .reduce((acc, o) => acc + o.total, 0)

  const fastestDelivery = 18

  const stats = [
    { emoji: '💰', label: 'Risparmiato questa settimana', value: formatEuro(weeklySpent), subtitle: 'nella vita reale 😉' },
    { emoji: '📦', label: 'Ordini fittizi totali', value: String(totalOrders()), subtitle: 'e nemmeno un euro speso' },
    { emoji: '🚀', label: 'Consegna più veloce', value: `${fastestDelivery} ore`, subtitle: 'simulata' },
    { emoji: '🛍️', label: 'Shopping lifetime', value: formatEuro(totalSpent()), subtitle: 'tutto virtuale!' },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-[var(--color-text)] text-lg">Il tuo relax 🧘</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-4 text-center"
          >
            <span className="text-2xl mb-2 block">{stat.emoji}</span>
            <p className="font-bold text-lg text-[var(--color-primary)]">{stat.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] leading-tight">{stat.label}</p>
            {stat.subtitle && (
              <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 italic">{stat.subtitle}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
