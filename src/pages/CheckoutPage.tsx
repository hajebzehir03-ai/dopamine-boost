import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { useBudgetStore } from '@/stores/budgetStore'
import { useStreakStore } from '@/stores/streakStore'
import { useOrderStore } from '@/stores/orderStore'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { PaymentSelector } from '@/components/checkout/PaymentSelector'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/common/Button'
import type { ShippingAddress, ShippingMethod, PaymentMethod, Order } from '@/types/order'
import { generateOrderId, generateTrackingCode, generateFakeAddress } from '@/utils/generators'
import { shippingCost } from '@/utils/formatters'

const defaultAddress = generateFakeAddress()

export function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalPrice, clear } = useCart()
  const { spend } = useBudgetStore()
  const { recordPurchase } = useStreakStore()
  const { addOrder } = useOrderStore()
  const [loading, setLoading] = useState(false)

  const [address, setAddress] = useState<ShippingAddress>({
    nome: 'Mario',
    cognome: 'Rossi',
    ...defaultAddress,
  })
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')

  const shipCost = shippingCost(shippingMethod)
  const total = totalPrice + shipCost

  const handleBuy = async () => {
    if (items.length === 0) return
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1500))

    const order: Order = {
      id: generateOrderId(),
      items,
      total,
      shippingCost: shipCost,
      address,
      shippingMethod,
      paymentMethod,
      createdAt: new Date().toISOString(),
      trackingCode: generateTrackingCode(),
      status: 'confermato',
    }

    addOrder(order)
    spend(total)
    recordPurchase()
    clear()

    navigate(`/conferma/${order.id}`)
  }

  if (items.length === 0) {
    navigate('/carrello')
    return null
  }

  return (
    <div className="p-4 pb-32">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold text-[var(--color-text)] mb-6"
      >
        Checkout 💳
      </motion.h1>

      <div className="space-y-6">
        <CheckoutForm
          address={address}
          shipping={shippingMethod}
          onAddressChange={setAddress}
          onShippingChange={setShippingMethod}
        />

        <PaymentSelector value={paymentMethod} onChange={setPaymentMethod} />

        <div>
          <h3 className="font-bold text-[var(--color-text)] mb-3">📋 Riepilogo ordine</h3>
          <CartSummary subtotal={totalPrice} shipping={shipCost} total={total} />
        </div>

        <div className="bg-[var(--color-background-secondary)] rounded-[var(--radius-lg)] p-3 text-xs text-[var(--color-text-muted)] text-center">
          🔒 Nessun addebito reale. CartRush è solo per divertimento!
        </div>

        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleBuy}
        >
          {loading ? 'Elaborazione in corso…' : '🛍️ ACQUISTA ORA'}
        </Button>
      </div>
    </div>
  )
}
