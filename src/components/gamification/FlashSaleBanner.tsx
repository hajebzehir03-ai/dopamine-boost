import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { formatEuro } from '@/utils/formatters'

interface FlashSaleBannerProps {
  products: Product[]
  onProductClick: (productId: number) => void
}

function useCountdown(durationMs: number) {
  const [remaining, setRemaining] = useState(durationMs)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const h = Math.floor(remaining / 3600000)
  const m = Math.floor((remaining % 3600000) / 60000)
  const s = Math.floor((remaining % 60000) / 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function FlashSaleBanner({ products, onProductClick }: FlashSaleBannerProps) {
  const countdown = useCountdown(52 * 60 * 1000 + 47 * 1000)

  if (products.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[var(--color-flash)] to-[var(--color-primary)] text-white rounded-[var(--radius-xl)] p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl flash-blink">⚡</span>
          <div>
            <p className="font-bold text-sm uppercase tracking-wider">Flash Sale</p>
            <p className="text-xs opacity-80">Fino a -70% su prodotti selezionati</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase opacity-80 mb-0.5">Scade tra</p>
          <p className="font-mono font-bold text-lg tabular-nums">{countdown}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {products.slice(0, 6).map((p) => (
          <button
            key={p.id}
            onClick={() => onProductClick(p.id)}
            className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-[var(--radius-md)] p-2 w-20 text-center hover:bg-white/30 transition-colors"
          >
            <img src={p.image} alt={p.title} className="w-12 h-12 object-contain mx-auto mb-1" />
            <p className="text-[10px] font-bold">{formatEuro(p.price)}</p>
            <p className="text-[10px] bg-white/30 rounded px-1">-{p.discount}%</p>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
