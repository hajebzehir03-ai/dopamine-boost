import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Plane, MapPin, PackageCheck, ShoppingBag } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { useOrderStore } from '@/stores/orderStore'
import { getCurrentOrderStatus } from '@/utils/timeSimulator'
import { formatEuro, formatShortDate } from '@/utils/formatters'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { LazyImage } from '@/components/common/LazyImage'

type BadgeVariant = 'primary' | 'success' | 'flash' | 'muted'
type IconComponent = React.ComponentType<LucideProps>

const STATUS_CONFIG: Record<string, { Icon: IconComponent; label: string; variant: BadgeVariant }> = {
  confermato: { Icon: CheckCircle, label: 'Confermato', variant: 'primary' },
  preparazione: { Icon: Package, label: 'In preparazione', variant: 'primary' },
  spedito: { Icon: Truck, label: 'Spedito', variant: 'flash' },
  transito: { Icon: Plane, label: 'In transito', variant: 'flash' },
  consegna: { Icon: MapPin, label: 'In consegna', variant: 'flash' },
  consegnato: { Icon: PackageCheck, label: 'Consegnato', variant: 'success' },
}

export function OrdersPage() {
  const navigate = useNavigate()
  const { orders } = useOrderStore()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center pb-32">
        <Package size={64} className="text-[var(--color-text-muted)] mb-4 opacity-30" aria-hidden="true" />
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Nessun ordine ancora</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Inizia a fare shopping!</p>
        <Button onClick={() => navigate('/')}>
          <span className="flex items-center gap-2">
            <ShoppingBag size={16} aria-hidden="true" />
            Vai allo shop
          </span>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-32">
      <h1 className="text-xl font-bold text-[var(--color-text)] mb-4">I miei ordini</h1>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const liveStatus = getCurrentOrderStatus(order.createdAt)
          const config = STATUS_CONFIG[liveStatus] ?? STATUS_CONFIG.confermato
          const { Icon, label, variant } = config

          return (
            <motion.button
              key={order.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate(`/tracking/${order.id}`)}
              className="card p-4 cursor-pointer hover:border-[var(--color-primary)] transition-colors w-full text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-mono text-sm font-bold text-[var(--color-primary)]">{order.id}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{formatShortDate(order.createdAt)}</p>
                </div>
                <Badge variant={variant}>
                  <span className="flex items-center gap-1">
                    <Icon size={10} aria-hidden="true" />
                    {label}
                  </span>
                </Badge>
              </div>

              {/* Products preview */}
              <div className="flex gap-1 mb-2">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.product.id} className="w-10 h-10 flex-shrink-0">
                    <LazyImage
                      src={item.product.image}
                      alt={item.product.title}
                      className="bg-[var(--color-background-secondary)] rounded-[var(--radius-sm)]"
                      imgClassName="p-1"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-10 h-10 bg-[var(--color-background-secondary)] rounded-[var(--radius-sm)] flex items-center justify-center text-xs text-[var(--color-text-muted)] font-bold flex-shrink-0">
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
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
