import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { useCart } from '@/hooks/useCart'
import { useThemeStore } from '@/stores/themeStore'
import { formatEuro } from '@/utils/formatters'
import { Badge } from '@/components/common/Badge'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const navigate = useNavigate()
  const { add, isInCart } = useCart()
  const { themeName } = useThemeStore()
  const [adding, setAdding] = useState(false)
  const inCart = isInCart(product.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdding(true)
    add(product)
    setTimeout(() => setAdding(false), 600)
  }

  const stars = '⭐'.repeat(Math.round(product.rating.rate))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/prodotto/${product.id}`)}
      className="card cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--color-background-secondary)]"
        style={{ aspectRatio: themeName === 'minimal' ? '3/2' : '1/1' }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.isFlashSale && (
          <div className="absolute top-2 left-2">
            <Badge variant="flash">⚡ -{product.discount}%</Badge>
          </div>
        )}
        {inCart && (
          <div className="absolute top-2 right-2">
            <Badge variant="success">✓</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Category */}
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1 truncate">
          {product.category}
        </p>

        {/* Title */}
        <p className={`
          text-[var(--color-text)] leading-tight mb-2 line-clamp-2
          ${themeName === 'shein' ? 'text-sm font-medium' : ''}
          ${themeName === 'glovo' ? 'text-sm font-semibold' : ''}
          ${themeName === 'minimal' ? 'font-display text-base' : ''}
        `}>
          {product.title}
        </p>

        {/* Rating */}
        <p className="text-[10px] text-[var(--color-text-muted)] mb-2">
          {stars} ({product.rating.count})
        </p>

        {/* Price + Add button */}
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
            className={`
              w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center text-white text-sm font-bold
              transition-colors duration-150
              ${inCart
                ? 'bg-[var(--color-success)]'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
              }
            `}
          >
            {inCart ? '✓' : '+'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
