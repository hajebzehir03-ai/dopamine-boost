import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  skeletonCount?: number
}

export function ProductGrid({ products, loading = false, skeletonCount = 8 }: ProductGridProps) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--color-text-muted)]">
        <p className="text-4xl mb-3">🛍️</p>
        <p className="text-lg font-medium">Nessun prodotto trovato</p>
        <p className="text-sm">Prova con un'altra ricerca</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
