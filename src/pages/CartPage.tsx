import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/common/Button'
import { shippingCost } from '@/utils/formatters'

export function CartPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clear } = useCart()
  const shipping = shippingCost('standard')
  const total = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center pb-32">
        <ShoppingCart size={64} className="text-[var(--color-text-muted)] mb-4 opacity-30" />
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Il carrello è vuoto</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Aggiungi qualcosa di bello!</p>
        <Button onClick={() => navigate('/')}>Inizia a fare shopping</Button>
      </div>
    )
  }

  return (
    <div className="p-4 pb-32">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-[var(--color-text)]">
          Il tuo carrello
        </h1>
        <button
          onClick={clear}
          className="text-xs text-[var(--color-error)] hover:opacity-70 transition-opacity"
        >
          Svuota tutto
        </button>
      </div>

      <AnimatePresence>
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </AnimatePresence>

      <div className="mt-4 mb-6">
        <CartSummary subtotal={totalPrice} shipping={shipping} total={total} />
      </div>

      <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
        Procedi al checkout — {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total)}
      </Button>
    </div>
  )
}
