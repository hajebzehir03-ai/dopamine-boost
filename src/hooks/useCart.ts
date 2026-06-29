import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/product'

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore()

  const add = (product: Product, quantity = 1) => addItem(product, quantity)

  const isInCart = (productId: number) => items.some((i) => i.product.id === productId)

  const getQuantity = (productId: number) =>
    items.find((i) => i.product.id === productId)?.quantity ?? 0

  return {
    items,
    add,
    remove: removeItem,
    updateQty: updateQuantity,
    clear: clearCart,
    totalItems: totalItems(),
    totalPrice: totalPrice(),
    isInCart,
    getQuantity,
  }
}
