import { useCallback } from 'react'
import { useCartStore } from '@/stores/cartStore'

export function useCart() {
  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)
  const totalPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  const isInCart = useCallback(
    (productId: number) => items.some((i) => i.product.id === productId),
    [items]
  )

  const getQuantity = useCallback(
    (productId: number) => items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [items]
  )

  return {
    items,
    add: addItem,
    remove: removeItem,
    updateQty: updateQuantity,
    clear: clearCart,
    totalItems,
    totalPrice,
    isInCart,
    getQuantity,
  }
}
