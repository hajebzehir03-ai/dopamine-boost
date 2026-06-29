import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Order } from '@/types/order'
import { formatEuro } from '@/utils/formatters'
import { Button } from '@/components/common/Button'

interface OrderConfirmationProps {
  order: Order
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  duration: number
  delay: number
  shape: 'rect' | 'circle'
}

function useTypewriter(text: string, delay = 80) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [text, delay])

  return { displayed, done }
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  const navigate = useNavigate()
  const [particles, setParticles] = useState<Particle[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { displayed: orderIdTyped, done: typingDone } = useTypewriter(order.id, 80)

  const CONFETTI_COLORS = ['#FF2060', '#FFDE07', '#FF6B00', '#00C853', '#2196F3', '#E91E63']

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: Math.random() * 8 + 6,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 1.5,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }))
    setParticles(newParticles)

    if ('vibrate' in navigator) navigator.vibrate([100, 50, 100, 50, 200])

    audioRef.current = new Audio('/sounds/kaching.mp3')
    audioRef.current.play().catch(() => {})

    return () => setParticles([])
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-[var(--color-background)]">
      {/* Confetti */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
        className="text-center z-10 max-w-sm w-full"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-7xl mb-6"
        >
          🎉
        </motion.div>

        <h1 className="font-display text-3xl font-bold text-[var(--color-text)] mb-2">
          Acquisto completato!
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mb-8">
          Il tuo pacco virtuale è in viaggio. Nessun centesimo speso davvero 😉
        </p>

        {/* Order ID typewriter */}
        <motion.div
          animate={typingDone ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="card p-5 mb-6 text-center"
        >
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Numero ordine
          </p>
          <p className={`font-display text-2xl text-[var(--color-primary)] ${!typingDone ? 'typewriter-cursor' : ''}`}>
            {orderIdTyped}
          </p>
        </motion.div>

        {/* Summary */}
        <div className="card p-4 mb-8 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Totale (fittizio)</span>
            <span className="font-bold text-[var(--color-text)]">{formatEuro(order.total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Spedizione</span>
            <span className="font-medium text-[var(--color-text)]">
              {{standard: 'Standard 3-5gg', express: 'Express 1-2gg', flash: 'Flash <24h'}[order.shippingMethod]}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Tracking</span>
            <span className="font-mono text-xs text-[var(--color-primary)]">{order.trackingCode}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            onClick={() => navigate(`/tracking/${order.id}`)}
          >
            📦 Segui il tuo pacco
          </Button>
          <Button
            fullWidth
            variant="ghost"
            onClick={() => navigate('/')}
          >
            🛍️ Continua a fare shopping
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
