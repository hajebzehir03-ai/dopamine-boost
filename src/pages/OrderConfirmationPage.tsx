import { useParams, useNavigate } from 'react-router-dom'
import { useOrderStore } from '@/stores/orderStore'
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation'
import { Button } from '@/components/common/Button'

export function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getOrder } = useOrderStore()
  const order = getOrder(id ?? '')

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <p className="text-4xl mb-4">❓</p>
        <p className="text-[var(--color-text)] font-medium mb-4">Ordine non trovato</p>
        <Button onClick={() => navigate('/')}>Torna alla home</Button>
      </div>
    )
  }

  return <OrderConfirmation order={order} />
}
