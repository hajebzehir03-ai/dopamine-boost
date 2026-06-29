import type { Product, ProductFilters } from '@/types/product'
import { API_CONFIG } from '@/config/api'
import { discountedPrice } from '@/utils/formatters'

function normalizeFakeStore(raw: Record<string, unknown>): Product {
  return {
    id: raw.id as number,
    title: raw.title as string,
    price: parseFloat(((raw.price as number) * 0.95).toFixed(2)),
    description: raw.description as string,
    category: raw.category as string,
    image: raw.image as string,
    rating: raw.rating as { rate: number; count: number },
    source: 'fakestoreapi',
  }
}

function normalizeDummyJSON(raw: Record<string, unknown>): Product {
  const images = (raw.images as string[]) || []
  return {
    id: (raw.id as number) + 1000,
    title: raw.title as string,
    price: parseFloat(((raw.price as number) * 0.92).toFixed(2)),
    description: raw.description as string,
    category: (raw.category as string) || 'altro',
    image: (raw.thumbnail as string) || images[0] || '',
    rating: { rate: raw.rating as number, count: raw.stock as number },
    source: 'dummyjson',
  }
}

function injectFlashSales(products: Product[]): Product[] {
  const candidates = [...products].sort(() => Math.random() - 0.5).slice(0, 5)
  const discounts = [30, 40, 50, 60, 70]
  return products.map((p) => {
    const idx = candidates.findIndex((c) => c.id === p.id)
    if (idx !== -1) {
      const disc = discounts[idx]
      return {
        ...p,
        isFlashSale: true,
        discount: disc,
        price: discountedPrice(p.price, disc),
      }
    }
    return p
  })
}

class ProductServiceClass {
  private cache: Product[] | null = null

  async getAll(): Promise<Product[]> {
    if (this.cache) return this.cache

    try {
      const res = await fetch(API_CONFIG.fakestoreapi.baseUrl + API_CONFIG.fakestoreapi.endpoints.products)
      if (!res.ok) throw new Error('FakeStore non disponibile')
      const data = await res.json() as Record<string, unknown>[]
      const products = data.map(normalizeFakeStore)
      this.cache = injectFlashSales(products)
      return this.cache
    } catch {
      return this.getDummyJSON()
    }
  }

  private async getDummyJSON(): Promise<Product[]> {
    const res = await fetch(API_CONFIG.dummyjson.baseUrl + API_CONFIG.dummyjson.endpoints.products)
    const data = await res.json() as { products: Record<string, unknown>[] }
    const products = data.products.map(normalizeDummyJSON)
    this.cache = injectFlashSales(products)
    return this.cache
  }

  async getById(id: number): Promise<Product | null> {
    const all = await this.getAll()
    return all.find((p) => p.id === id) ?? null
  }

  async search(query: string): Promise<Product[]> {
    const all = await this.getAll()
    const q = query.toLowerCase()
    return all.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }

  async filter(filters: ProductFilters): Promise<Product[]> {
    let products = await this.getAll()

    if (filters.search) {
      const q = filters.search.toLowerCase()
      products = products.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }

    if (filters.category && filters.category !== 'tutti') {
      products = products.filter((p) => p.category === filters.category)
    }

    switch (filters.sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating.rate - a.rating.rate)
        break
    }

    return products
  }

  getFlashSales(products: Product[]): Product[] {
    return products.filter((p) => p.isFlashSale)
  }

  clearCache(): void {
    this.cache = null
  }
}

export const ProductService = new ProductServiceClass()
