import { memo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Plus, Star } from 'lucide-react'
import type { Product } from '@/types/product'
import type { ThemeName } from '@/types/theme'
import { formatEuro } from '@/utils/formatters'
import { Badge } from '@/components/common/Badge'
import { LazyImage } from '@/components/common/LazyImage'

interface ProductCardProps {
  product: Product
  themeName: ThemeName
  inCart: boolean
  onAdd: (product: Product) => void
}

function StarRating({ rate, count }: { rate: number; count: number }) {
  const filled = Math.round(rate)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={10}
          className={i < filled
            ? 'text-[var(--color-accent)] fill-[var(--color-accent)]'
            : 'text-[var(--color-border)] fill-[var(--color-border)]'}
        />
      ))}
      <span className="text-[10px] text-[var(--color-text-muted)] ml-1">({count})</span>
    </div>
  )
}

export const ProductCard = memo(function ProductCard({ product, themeName, inCart, onAdd }: ProductCardProps) {
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)
  const addingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (addingTimerRef.current) clearTimeout(addingTimerRef.current) }, [])

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdding(true)
    onAdd(product)
    addingTimerRef.current = setTimeout(() => setAdding(false), 600)
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/prodotto/${product.id}`)}
      className="card cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-[var(--color-background-secondary)]"
        style={{ aspectRatio: themeName === 'minimal' ? '3/2' : '1/1' }}
      >
        <LazyImage
          src={product.image}
          alt={product.title}
          imgClassName="p-3 transition-transform duration-300 group-hover:scale-105"
        />
        {product.isFlashSale && (
          <div className="absolute top-2 left-2">
            <Badge variant="flash">⚡ -{product.discount}%</Badge>
          </div>
        )}
        {inCart && (
          <div className="absolute top-2 right-2">
            <Badge variant="success"><Check size={10} /></Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1 truncate">
          {product.category}
        </p>

        <p className={`
          text-[var(--color-text)] leading-tight mb-2 line-clamp-2
          ${themeName === 'shein' ? 'text-sm font-medium' : ''}
          ${themeName === 'glovo' ? 'text-sm font-semibold' : ''}
          ${themeName === 'minimal' ? 'font-display text-base' : ''}
        `}>
          {product.title}
        </p>

        <div className="mb-2">
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className={`
            font-bold text-[var(--color-primary)]
            ${themeName === 'shein' ? 'font-display text-xl' : 'text-lg'}
          `}>
            {formatEuro(product.price)}
          </span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            animate={adding ? { scale: [1, 1.3, 1] } : {}}
            onClick={handleAdd}
            aria-label={inCart ? 'Nel carrello' : 'Aggiungi al carrello'}
            className={`
              w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center text-white
              transition-colors duration-150
              ${inCart
                ? 'bg-[var(--color-success)]'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'}
            `}
          >
            {inCart ? <Check size={14} /> : <Plus size={14} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})
