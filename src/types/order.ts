import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
  selectedVariants?: Record<string, string>
}

export interface ShippingAddress {
  nome: string
  cognome: string
  via: string
  citta: string
  cap: string
  provincia: string
}

export type ShippingMethod = 'standard' | 'express' | 'flash'
export type PaymentMethod = 'card' | 'paypal' | 'applepay'

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shippingCost: number
  address: ShippingAddress
  shippingMethod: ShippingMethod
  paymentMethod: PaymentMethod
  createdAt: string
  trackingCode: string
  status: OrderStatus
}

export type OrderStatus = 'confermato' | 'preparazione' | 'spedito' | 'transito' | 'consegna' | 'consegnato'
