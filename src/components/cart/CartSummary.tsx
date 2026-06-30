import { formatEuro } from '@/utils/formatters'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  total: number
}

export function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  const shippingLabel =
    shipping === undefined ? 'Calcolata al checkout' :
    shipping === 0 ? 'Gratis' :
    formatEuro(shipping)

  return (
    <div className="card p-4 space-y-2">
      <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
        <span>Subtotale</span>
        <span>{formatEuro(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
        <span>Spedizione</span>
        <span>{shippingLabel}</span>
      </div>
      <div className="border-t border-[var(--color-border)] pt-2 flex justify-between font-bold text-[var(--color-text)] text-lg">
        <span>Totale</span>
        <span className="text-[var(--color-primary)]">{formatEuro(total)}</span>
      </div>
    </div>
  )
}
