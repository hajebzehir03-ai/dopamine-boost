import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOrderStore } from '@/stores/orderStore'
import { getCurrentOrderStatus } from '@/utils/timeSimulator'
import { formatEuro, formatShortDate } from '@/utils/formatters'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'

const STATUS_BADGE: Record<string, { label: string; variant: 'primary' | 'success' | 'flash' | 'muted' }> = {
  confermato: { label: '✅ Confermato', variant: 'primary' },
  preparazione: { label: '📦 In preparazione', variant: 'primary' },
  spedito: { label: '🚚 Spedito', variant: 'flash' },
  transito: { label: '✈️ In transito', variant: 'flash' },
  consegna: { label: '🏘️ In consegna', variant: 'flash' },
  consegnato: { label: '🎉 Consegnato', variant: 'success' },
}

export function OrdersPage() {
  const navigate = useNavigate()
  const { orders } = useOrderStore()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center pb-32">
        <p className="text-6xl mb-4">📦</p>
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Nessun ordine ancora</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Inizia a fare shopping!</p>
        <Button onClick={() => navigate('/')}>🛍️ Vai allo shop</Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-32">
      <h1 className="text-xl font-bold text-[var(--color-text)] mb-4">I miei ordini 📦</h1>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const liveStatus = getCurrentOrderStatus(order.createdAt)
          const badgeInfo = STATUS_BADGE[liveStatus]

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(`/tracking/${order.id}`)}
              className="card p-4 cursor-pointer hover:border-[var(--color-primary)] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-sm font-bold text-[var(--color-primary)]">{order.id}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{formatShortDate(order.createdAt)}</p>
                </div>
                <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
              </div>

              {/* Products preview */}
              <div className="flex gap-1 mb-2">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.product.id}
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-10 h-10 object-contain bg-[var(--color-background-secondary)] rounded-[var(--radius-sm)] p-1"
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="w-10 h-10 bg-[var(--color-background-secondary)] rounded-[var(--radius-sm)] flex items-center justify-center text-xs text-[var(--color-text-muted)] font-bold">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {order.items.reduce((a, i) => a + i.quantity, 0)} articoli
                </span>
                <span className="font-bold text-[var(--color-text)]">{formatEuro(order.total)}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
