import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order } from '@/types/order'

interface OrderStore {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrder: (id: string) => Order | undefined
  totalSpent: () => number
  totalOrders: () => number
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set({ orders: [order, ...get().orders] }),

      getOrder: (id) => get().orders.find((o) => o.id === id),

      totalSpent: () => get().orders.reduce((acc, o) => acc + o.total, 0),

      totalOrders: () => get().orders.length,
    }),
    { name: 'cartrush-orders' }
  )
)
