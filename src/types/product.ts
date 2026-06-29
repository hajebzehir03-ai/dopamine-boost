export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  source?: 'fakestoreapi' | 'dummyjson'
  discount?: number
  isFlashSale?: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  type: 'size' | 'color'
  options: string[]
  selected?: string
}

export interface ProductFilters {
  category: string
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  search: string
}

export type ProductCategory = 'tutti' | 'abbigliamento' | 'elettronica' | 'gioielli' | 'sport' | 'altro'
