import { useState, useEffect, useCallback } from 'react'
import type { Product, ProductFilters } from '@/types/product'
import { ProductService } from '@/services/ProductService'

const defaultFilters: ProductFilters = {
  category: 'tutti',
  sortBy: 'default',
  search: '',
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [flashSales, setFlashSales] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(defaultFilters)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filtered = await ProductService.filter(filters)
      setProducts(filtered)
      if (filters.category === 'tutti' && !filters.search) {
        setFlashSales(ProductService.getFlashSales(filtered))
      }
    } catch {
      setError('Impossibile caricare i prodotti. Riprova.')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [load])

  return { products, flashSales, loading, error, filters, setFilters, reload: load }
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    ProductService.getById(id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading }
}
