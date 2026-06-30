import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { useThemeStore } from '@/stores/themeStore'
import { useCart } from '@/hooks/useCart'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  skeletonCount?: number
}

export function ProductGrid({ products, loading = false, skeletonCount = 8 }: ProductGridProps) {
  const { themeName } = useThemeStore()
  const { add, isInCart } = useCart()

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
        <p className="text-4xl mb-3">–</p>
        <p className="text-lg font-medium">Nessun prodotto trovato</p>
        <p className="text-sm">Prova con un'altra ricerca</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p.id} className="product-grid-item">
          <ProductCard
            product={p}
            themeName={themeName}
            inCart={isInCart(p.id)}
            onAdd={add}
          />
        </div>
      ))}
    </div>
  )
}
