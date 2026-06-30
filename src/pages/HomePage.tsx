import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { SearchBar } from '@/components/common/SearchBar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { BudgetBar } from '@/components/gamification/BudgetBar'
import { FlashSaleBanner } from '@/components/gamification/FlashSaleBanner'
import { StreakBadge } from '@/components/gamification/StreakBadge'
import { useThemeStore } from '@/stores/themeStore'

const CATEGORIES = ['tutti', 'abbigliamento', "men's clothing", "women's clothing", 'electronics', 'jewelery']
const CATEGORY_LABELS: Record<string, string> = {
  tutti: 'Tutti',
  'abbigliamento': 'Moda',
  "men's clothing": 'Uomo',
  "women's clothing": 'Donna',
  electronics: 'Tech',
  jewelery: 'Gioielli',
}

export function HomePage() {
  const navigate = useNavigate()
  const { themeName } = useThemeStore()
  const { products, flashSales, loading, error, filters, setFilters } = useProducts()

  return (
    <div className="flex flex-col">
      <BudgetBar />

      <div className="px-4 py-4 space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className={`${themeName === 'shein' ? 'font-display text-4xl' : themeName === 'minimal' ? 'font-display text-3xl' : 'text-2xl font-bold'} text-[var(--color-text)] leading-none`}>
              CartRush
            </h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Shopping senza conseguenze</p>
          </div>
          <StreakBadge />
        </motion.div>

        <SearchBar
          value={filters.search}
          onChange={(search) => setFilters({ ...filters, search })}
        />

        {/* Flash Sale */}
        {flashSales.length > 0 && !filters.search && (
          <FlashSaleBanner
            products={flashSales}
            onProductClick={(id) => navigate(`/prodotto/${id}`)}
          />
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${filters.category === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-background-secondary)] text-[var(--color-text-muted)]'}
              `}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </motion.button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">Ordina:</span>
          {(['default', 'price-asc', 'price-desc', 'rating'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilters({ ...filters, sortBy: s })}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                filters.sortBy === s ? 'text-[var(--color-primary)] font-semibold' : 'text-[var(--color-text-muted)]'
              }`}
            >
              {{ default: 'Default', 'price-asc': '€↑', 'price-desc': '€↓', rating: 'Rating' }[s]}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-8 text-[var(--color-error)]">
            <p>{error}</p>
          </div>
        )}

        {/* Products */}
        <ProductGrid products={products} loading={loading} />

        <div className="h-24" />
      </div>
    </div>
  )
}
