import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useOrderStore } from '@/stores/orderStore'
import { useTracking } from '@/hooks/useTracking'
import { TrackingTimeline } from '@/components/tracking/TrackingTimeline'
import { TrackingMap } from '@/components/tracking/TrackingMap'
import { TrackingCode } from '@/components/tracking/TrackingCode'
import { Button } from '@/components/common/Button'
import { formatDate } from '@/utils/formatters'

export function TrackingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getOrder } = useOrderStore()
  const order = getOrder(id ?? '')
  const { steps, route, currentStep } = useTracking(order)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <p className="text-4xl mb-4">📦</p>
        <p className="text-[var(--color-text)] font-medium mb-4">Ordine non trovato</p>
        <Button onClick={() => navigate('/ordini')}>Vai ai tuoi ordini</Button>
      </div>
    )
  }

  return (
    <div className="pb-32">
      <div className="sticky top-0 z-10 bg-[var(--color-background)] px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-3">
        <button onClick={() => navigate(-1)} aria-label="Torna indietro" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-xl leading-none">←</button>
        <h1 className="font-bold text-[var(--color-text)]">Traccia ordine</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Order info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4"
        >
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Ordine</p>
          <p className="font-mono text-lg font-bold text-[var(--color-primary)]">{order.id}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Effettuato il {formatDate(order.createdAt)}
          </p>
        </motion.div>

        {/* Tracking code */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">Codice di tracciamento</p>
          <TrackingCode code={order.trackingCode} />
        </div>

        {/* Current status */}
        {currentStep && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[var(--color-primary)] text-white rounded-[var(--radius-xl)] p-4 text-center"
          >
            <p className="text-3xl mb-1">{currentStep.emoji}</p>
            <p className="font-bold">{currentStep.label}</p>
            <p className="text-sm opacity-80">{currentStep.location}</p>
          </motion.div>
        )}

        {/* Map */}
        {route && (
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-2">🗺️ Posizione del pacco</p>
            <TrackingMap route={route} />
          </div>
        )}

        {/* Timeline */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)] mb-3">📋 Cronologia</p>
          <TrackingTimeline steps={steps} />
        </div>
      </div>
    </div>
  )
}
