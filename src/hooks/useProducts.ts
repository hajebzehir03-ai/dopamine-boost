import { useState, useEffect, useCallback, useRef } from 'react'
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
  const hasLoadedOnce = useRef(false)
  const requestIdRef = useRef(0)

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current
    if (!hasLoadedOnce.current) setLoading(true)
    setError(null)
    try {
      const filtered = await ProductService.filter(filters)
      // Discard stale responses — only apply the most recent request
      if (requestId !== requestIdRef.current) return
      hasLoadedOnce.current = true
      setProducts(filtered)
      if (filters.category === 'tutti' && !filters.search) {
        setFlashSales(ProductService.getFlashSales(filtered))
      }
    } catch {
      if (requestId !== requestIdRef.current) return
      setError('Impossibile caricare i prodotti. Riprova.')
    } finally {
      if (requestId === requestIdRef.current) setLoading(false)
    }
  }, [filters])

  useEffect(() => { load() }, [load])

  return { products, flashSales, loading, error, filters, setFilters, reload: load }
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    ProductService.getById(id).then((p) => {
      if (!cancelled) setProduct(p)
    }).finally(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [id])

  return { product, loading }
}
