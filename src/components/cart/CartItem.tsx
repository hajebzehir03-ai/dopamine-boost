import { motion } from 'framer-motion'
import type { CartItem as CartItemType } from '@/types/order'
import { useCart } from '@/hooks/useCart'
import { formatEuro, truncate } from '@/utils/formatters'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQty, remove } = useCart()
  const { product, quantity } = item

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-3 p-3 card mb-3"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-16 h-16 object-contain rounded-[var(--radius-md)] bg-[var(--color-background-secondary)] p-1 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text)] line-clamp-2 leading-tight mb-1">
          {truncate(product.title, 50)}
        </p>
        <p className="font-bold text-[var(--color-primary)] text-base">
          {formatEuro(product.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => remove(product.id)}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] text-lg leading-none transition-colors"
        >
          ×
        </button>

        <div className="flex items-center gap-2 bg-[var(--color-background-secondary)] rounded-[var(--radius-md)] px-2 py-1">
          <button
            onClick={() => updateQty(product.id, quantity - 1)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-bold w-5 text-center"
          >
            −
          </button>
          <span className="text-sm font-bold text-[var(--color-text)] min-w-[1.5rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => updateQty(product.id, quantity + 1)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] font-bold w-5 text-center"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  )
}
