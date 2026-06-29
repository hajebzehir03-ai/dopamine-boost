import type { Product, ProductFilters } from '@/types/product'
import { API_CONFIG } from '@/config/api'
import { discountedPrice } from '@/utils/formatters'

function normalizeFakeStore(raw: Record<string, unknown>): Product {
  const price = typeof raw.price === 'number' ? raw.price : parseFloat(String(raw.price)) || 0
  const rating = (raw.rating && typeof raw.rating === 'object') ? raw.rating as { rate: number; count: number } : { rate: 0, count: 0 }
  return {
    id: raw.id as number,
    title: String(raw.title ?? 'Prodotto senza nome'),
    price: parseFloat((price * 0.95).toFixed(2)),
    description: String(raw.description ?? ''),
    category: String(raw.category ?? 'altro'),
    image: typeof raw.image === 'string' && raw.image.startsWith('http') ? raw.image : '',
    rating,
    source: 'fakestoreapi',
  }
}

function normalizeDummyJSON(raw: Record<string, unknown>): Product {
  const images = Array.isArray(raw.images) ? (raw.images as string[]) : []
  const price = typeof raw.price === 'number' ? raw.price : parseFloat(String(raw.price)) || 0
  const thumbnail = typeof raw.thumbnail === 'string' && raw.thumbnail.startsWith('http') ? raw.thumbnail : ''
  const fallbackImg = typeof images[0] === 'string' && images[0].startsWith('http') ? images[0] : ''
  return {
    id: (typeof raw.id === 'number' ? raw.id : 0) + 1000,
    title: String(raw.title ?? 'Prodotto senza nome'),
    price: parseFloat((price * 0.92).toFixed(2)),
    description: String(raw.description ?? ''),
    category: String(raw.category ?? 'altro'),
    image: thumbnail || fallbackImg,
    rating: {
      rate: typeof raw.rating === 'number' ? raw.rating : 0,
      count: typeof raw.stock === 'number' ? raw.stock : 0,
    },
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
    if (!res.ok) throw new Error(`DummyJSON error: ${res.status}`)
    const data = await res.json() as { products?: Record<string, unknown>[] }
    if (!Array.isArray(data.products)) throw new Error('DummyJSON: formato risposta non valido')
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
