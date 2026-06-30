import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [scrolled, setScrolled] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={contentRef} className="flex flex-col">

      {/* ─── Sticky blur header ─── */}
      <header
        className={`sticky top-0 z-20 transition-all duration-200 ${scrolled ? 'header-blur shadow-sm' : 'bg-[var(--color-background)]'}`}
      >
        {/* Logo row */}
        <div className="px-[18px] pt-2 pb-2 flex items-center justify-between">
          <h1 className={`
            leading-none text-[var(--color-text)]
            ${themeName === 'shein' ? 'font-display text-[27px] tracking-tight' : ''}
            ${themeName === 'glovo' ? 'text-[25px] font-extrabold' : ''}
            ${themeName === 'minimal' ? 'font-display text-[26px] font-medium' : ''}
          `}>
            CartRush<span className="text-[var(--color-primary)]">.</span>
          </h1>
          <StreakBadge />
        </div>

        {/* Budget bar */}
        <BudgetBar />

        {/* Search */}
        <div className="px-[18px] pb-3 pt-2">
          <SearchBar
            value={filters.search}
            onChange={(search) => setFilters({ ...filters, search })}
          />
        </div>
      </header>

      {/* ─── Scrollable content ─── */}
      <div className="px-[18px] pb-28 space-y-3">

        {/* Flash Sale */}
        {flashSales.length > 0 && !filters.search && (
          <FlashSaleBanner
            products={flashSales}
            onProductClick={(id) => navigate(`/prodotto/${id}`)}
          />
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-[18px] px-[18px] no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`
                flex-shrink-0 px-[18px] py-2 rounded-full text-[13px] font-semibold transition-colors
                ${filters.category === cat
                  ? 'bg-[var(--color-text)] text-[var(--color-background)]'
                  : 'bg-[var(--color-background-secondary)] text-[var(--color-text)] border border-[var(--color-border)]'}
              `}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-[var(--color-text-muted)] font-semibold">Ordina:</span>
          {(['default', 'price-asc', 'price-desc', 'rating'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilters({ ...filters, sortBy: s })}
              className={`text-[12px] px-[11px] py-[5px] rounded-[14px] transition-colors font-semibold ${
                filters.sortBy === s
                  ? 'bg-[var(--color-background-secondary)] text-[var(--color-text)]'
                  : 'text-[var(--color-text-muted)] border border-[var(--color-border)]'
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
      </div>
    </div>
  )
}
