import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import type { Product } from '@/types/product'
import { formatEuro } from '@/utils/formatters'
import { LazyImage } from '@/components/common/LazyImage'

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
      className="relative overflow-hidden text-white p-[14px] mb-1"
      style={{
        background: 'linear-gradient(120deg, var(--color-primary) 0%, #FF3D5A 45%, var(--color-flash) 100%)',
        borderRadius: '18px',
        boxShadow: 'var(--flash-shadow)',
      }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-8 -right-5 w-[110px] h-[110px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap size={18} fill="white" stroke="none" />
          <div>
            <p className="font-bold text-[16px] uppercase tracking-[0.3px]">Flash Sale</p>
            <p className="text-[11px] font-semibold opacity-80">Fino a -70% su prodotti selezionati</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase opacity-80 mb-0.5 font-semibold">Finisce tra</p>
          <p
            className="font-bold text-[16px] tabular-nums px-[9px] py-[3px] rounded-[7px]"
            style={{ fontFamily: '"JetBrains Mono", monospace', background: 'rgba(0,0,0,0.18)', letterSpacing: '1px' }}
          >
            {countdown}
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-0.5 no-scrollbar">
        {products.slice(0, 6).map((p) => (
          <button
            key={p.id}
            onClick={() => onProductClick(p.id)}
            className="flex-shrink-0 rounded-[11px] p-2 w-[72px] text-center hover:bg-white/30 transition-colors"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            <div className="w-10 h-10 mx-auto mb-1">
              <LazyImage src={p.image} alt={p.title} />
            </div>
            <p className="text-[10px] font-bold text-[var(--color-text)]">{formatEuro(p.price)}</p>
            <p
              className="text-[10px] font-bold mt-0.5 text-white px-1 rounded-[4px]"
              style={{ background: 'var(--color-primary)' }}
            >
              -{p.discount}%
            </p>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
