import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ShoppingCart, Truck, RefreshCw } from 'lucide-react'
import { useProduct } from '@/hooks/useProducts'
import { useCartStore } from '@/stores/cartStore'
import { Gallery } from '@/components/product/Gallery'
import { StarRating } from '@/components/product/StarRating'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { formatEuro } from '@/utils/formatters'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { product, loading } = useProduct(Number(id))
  const productId = product?.id ?? -1
  const addItem = useCartStore(state => state.addItem)
  const inCart = useCartStore(state => state.items.some(i => i.product.id === productId))

  if (loading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="skeleton aspect-square rounded-[var(--radius-lg)]" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-12 rounded-[var(--radius-md)]" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <p className="text-[var(--color-text)] font-medium mb-4">Prodotto non trovato</p>
        <Button onClick={() => navigate('/')}>Torna alla home</Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32"
    >
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-[var(--color-background)] px-4 py-3 border-b border-[var(--color-border)] flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Torna indietro"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1 rounded-[var(--radius-sm)] transition-colors"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <span className="text-sm font-medium text-[var(--color-text)] truncate">{product.category}</span>
      </div>

      <div className="p-4 space-y-5">
        <Gallery images={[product.image]} alt={product.title} />

        {/* Badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="muted">{product.category}</Badge>
          {product.isFlashSale && <Badge variant="flash">Flash Sale -{product.discount}%</Badge>}
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-[var(--color-text)] leading-tight">{product.title}</h1>

        {/* Rating */}
        <StarRating rate={product.rating.rate} count={product.rating.count} size={14} />

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="font-display text-4xl text-[var(--color-primary)] font-bold">
            {formatEuro(product.price)}
          </span>
          <span className="text-sm text-[var(--color-text-muted)] line-through">
            {formatEuro(product.price * 1.3)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{product.description}</p>

        {/* Sizes (mock) */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)] mb-2">Taglia</p>
          <div className="flex gap-2">
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                aria-label={`Taglia ${size}`}
                className="w-10 h-10 border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex gap-4 text-sm text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5">
            <Truck size={14} aria-hidden="true" />
            Spedizione gratis
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw size={14} aria-hidden="true" />
            Reso gratuito
          </span>
        </div>
      </div>

      {/* CTA sticky */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-[var(--color-background)] border-t border-[var(--color-border)]">
        <Button
          fullWidth
          size="lg"
          variant={inCart ? 'secondary' : 'primary'}
          onClick={() => {
            if (inCart) navigate('/carrello')
            else addItem(product)
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {inCart
              ? <><Check size={16} aria-hidden="true" /> Nel carrello — Vai al carrello</>
              : <><ShoppingCart size={16} aria-hidden="true" /> Aggiungi al carrello</>}
          </span>
        </Button>
      </div>
    </motion.div>
  )
}
