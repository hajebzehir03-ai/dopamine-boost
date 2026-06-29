import type { PaymentMethod } from '@/types/order'
import { generateFakeCardLast4 } from '@/utils/generators'
import { useState } from 'react'

interface PaymentSelectorProps {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

const METHODS: { key: PaymentMethod; label: string; icon: string; detail: string }[] = [
  { key: 'card', label: 'Carta di credito', icon: '💳', detail: `•••• •••• •••• ${generateFakeCardLast4()}` },
  { key: 'paypal', label: 'PayPal', icon: '🔵', detail: 'tu@email.com (simulato)' },
  { key: 'applepay', label: 'Apple Pay', icon: '🍎', detail: 'Face ID pronto' },
]

export function PaymentSelector({ value, onChange }: PaymentSelectorProps) {
  const [details] = useState(METHODS)

  return (
    <div>
      <h3 className="font-bold text-[var(--color-text)] mb-3">💳 Metodo di pagamento</h3>
      <div className="space-y-2">
        {details.map((m) => (
          <label
            key={m.key}
            className={`
              flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 cursor-pointer transition-colors
              ${value === m.key ? 'border-[var(--color-primary)] bg-[var(--color-background-secondary)]' : 'border-[var(--color-border)]'}
            `}
          >
            <input
              type="radio"
              name="payment"
              value={m.key}
              checked={value === m.key}
              onChange={() => onChange(m.key)}
              className="accent-[var(--color-primary)]"
            />
            <span className="text-xl">{m.icon}</span>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">{m.label}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{m.detail}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
