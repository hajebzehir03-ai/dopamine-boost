import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { Gallery } from '@/components/product/Gallery'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { formatEuro } from '@/utils/formatters'

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { product, loading } = useProduct(Number(id))
  const { add, isInCart } = useCart()
  const inCart = product ? isInCart(product.id) : false

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
        <p className="text-4xl mb-4">😔</p>
        <p className="text-[var(--color-text)] font-medium mb-4">Prodotto non trovato</p>
        <Button onClick={() => navigate('/')}>Torna alla home</Button>
      </div>
    )
  }

  const images = [product.image, product.image]
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.round(product.rating.rate) ? '⭐' : '☆'
  ).join('')

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
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xl"
        >
          ←
        </button>
        <span className="text-sm font-medium text-[var(--color-text)] truncate">{product.category}</span>
      </div>

      <div className="p-4 space-y-5">
        <Gallery images={images} alt={product.title} />

        {/* Badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="muted">{product.category}</Badge>
          {product.isFlashSale && <Badge variant="flash">⚡ Flash Sale -{product.discount}%</Badge>}
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-[var(--color-text)] leading-tight">{product.title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-base">{stars}</span>
          <span className="text-sm text-[var(--color-text-muted)]">{product.rating.rate}/5 ({product.rating.count} recensioni)</span>
        </div>

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
                className="w-10 h-10 border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery info */}
        <div className="flex gap-4 text-sm text-[var(--color-text-muted)]">
          <span>🚚 Spedizione gratis</span>
          <span>↩️ Reso gratuito</span>
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
            else add(product)
          }}
        >
          {inCart ? '✓ Nel carrello — Vai al carrello' : '🛒 Aggiungi al carrello'}
        </Button>
      </div>
    </motion.div>
  )
}
