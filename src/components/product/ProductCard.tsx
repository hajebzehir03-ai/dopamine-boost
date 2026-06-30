import { memo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import type { Product } from '@/types/product'
import type { ThemeName } from '@/types/theme'
import { formatEuro } from '@/utils/formatters'
import { Badge } from '@/components/common/Badge'
import { LazyImage } from '@/components/common/LazyImage'
import { StarRating } from '@/components/product/StarRating'

interface ProductCardProps {
  product: Product
  themeName: ThemeName
  inCart: boolean
  onAdd: (product: Product) => void
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

  /* ── Minimal: full-width editorial layout ── */
  if (themeName === 'minimal') {
    return (
      <div
        onClick={() => navigate(`/prodotto/${product.id}`)}
        className="cursor-pointer"
      >
        {/* Image 3:2 */}
        <div className="relative overflow-hidden bg-[var(--color-background-secondary)] rounded-[4px] mb-3" style={{ aspectRatio: '3/2' }}>
          <LazyImage
            src={product.image}
            alt={product.title}
            imgClassName="p-6 transition-transform duration-500 hover:scale-105"
          />
          {product.isFlashSale && (
            <div className="absolute top-3 left-3">
              <span className="bg-[var(--color-text)] text-[var(--color-background)] text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wider">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[1px] mb-1">
              {product.category}
            </p>
            <p className="font-display text-[17px] font-medium text-[var(--color-text)] leading-[1.25] line-clamp-2 mb-1">
              {product.title}
            </p>
            <StarRating rate={product.rating.rate} count={product.rating.count} size={11} />
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="font-display text-[20px] font-medium text-[var(--color-accent)]">
              {formatEuro(product.price)}
            </span>
            <button
              onClick={handleAdd}
              aria-label={inCart ? 'Nel carrello' : 'Aggiungi al carrello'}
              className={`
                w-[34px] h-[34px] rounded-full border flex items-center justify-center
                transition-colors duration-150
                ${inCart
                  ? 'bg-[var(--color-text)] border-[var(--color-text)] text-[var(--color-background)]'
                  : 'border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)]'}
              `}
            >
              {inCart ? <Check size={14} /> : <Plus size={14} />}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Shein / Glovo: grid card ── */
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/prodotto/${product.id}`)}
      className="card cursor-pointer overflow-hidden"
      style={{ borderRadius: themeName === 'glovo' ? '18px' : '15px' }}
    >
      {/* Image — square aspect ratio, bg-secondary */}
      <div className="relative overflow-hidden bg-[var(--color-background-secondary)]" style={{ aspectRatio: '1/1' }}>
        <LazyImage
          src={product.image}
          alt={product.title}
          imgClassName="p-3 transition-transform duration-300 group-hover:scale-105 w-full h-full object-contain"
        />
        {product.isFlashSale && (
          <div className="absolute top-2 left-2">
            <span
              className="text-white text-[11px] font-extrabold px-[7px] py-[2px] rounded-[6px]"
              style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}
            >
              -{product.discount}%
            </span>
          </div>
        )}
        {inCart && (
          <div className="absolute top-2 right-2">
            <Badge variant="success"><Check size={10} /></Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-[9px_10px_11px]">
        {/* Category */}
        <p
          className="text-[9px] font-bold uppercase text-[var(--color-text-muted)] mb-[3px] truncate"
          style={{ letterSpacing: '0.8px' }}
        >
          {product.category}
        </p>

        {/* Title — fixed 31px height to align prices */}
        <p
          className="text-[12.5px] font-semibold text-[var(--color-text)] leading-[1.25] line-clamp-2 mb-[5px]"
          style={{ height: '31px', overflow: 'hidden' }}
        >
          {product.title}
        </p>

        {/* Rating */}
        <div className="mb-[7px]">
          <StarRating rate={product.rating.rate} count={product.rating.count} size={10} />
        </div>

        {/* Price + add button */}
        <div className="flex items-center justify-between gap-1.5">
          <span
            className="text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, lineHeight: 1 }}
          >
            {formatEuro(product.price)}
          </span>

          <motion.button
            whileTap={{ scale: 0.85 }}
            animate={adding ? { scale: [1, 1.3, 1] } : {}}
            onClick={handleAdd}
            aria-label={inCart ? 'Nel carrello' : 'Aggiungi al carrello'}
            className={`
              w-[28px] h-[28px] flex items-center justify-center text-white flex-shrink-0
              transition-colors duration-150
              ${inCart ? 'bg-[var(--color-success)]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'}
            `}
            style={{ borderRadius: themeName === 'glovo' ? '10px' : '9px' }}
          >
            {inCart ? <Check size={13} /> : <Plus size={13} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})
