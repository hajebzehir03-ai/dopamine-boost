import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SearchBar } from '@/components/common/SearchBar'

export function EsploraPage() {
  const { products, loading, filters, setFilters } = useProducts()

  return (
    <div className="p-4 pb-32 space-y-4">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold text-[var(--color-text)]"
      >
        Esplora 🔍
      </motion.h1>

      <SearchBar
        value={filters.search}
        onChange={(search) => setFilters({ ...filters, search })}
        placeholder="Cerca qualsiasi prodotto…"
      />

      <ProductGrid products={products} loading={loading} />
    </div>
  )
}
