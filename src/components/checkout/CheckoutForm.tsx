import type { ShippingAddress, ShippingMethod } from '@/types/order'
import { shippingLabel } from '@/utils/formatters'

interface CheckoutFormProps {
  address: ShippingAddress
  shipping: ShippingMethod
  onAddressChange: (addr: ShippingAddress) => void
  onShippingChange: (method: ShippingMethod) => void
}

const shippingMethods: ShippingMethod[] = ['standard', 'express', 'flash']

export function CheckoutForm({ address, shipping, onAddressChange, onShippingChange }: CheckoutFormProps) {
  const field = (key: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onAddressChange({ ...address, [key]: e.target.value })

  const inputClass = `
    w-full px-3 py-2.5 rounded-[var(--radius-md)]
    bg-[var(--color-background-secondary)]
    border border-[var(--color-border)]
    text-[var(--color-text)]
    focus:outline-none focus:border-[var(--color-primary)]
    transition-colors text-sm
  `

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-bold text-[var(--color-text)] mb-3">📍 Indirizzo di spedizione</h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-3">
          🔒 I dati che inserisci restano solo su questo dispositivo — non vengono mai inviati a nessun server.
          Usa pure un nome e un indirizzo di fantasia!
        </p>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Nome" value={address.nome} onChange={field('nome')} className={inputClass} />
          <input placeholder="Cognome" value={address.cognome} onChange={field('cognome')} className={inputClass} />
          <input placeholder="Via e numero" value={address.via} onChange={field('via')} className={`${inputClass} col-span-2`} />
          <input placeholder="Città" value={address.citta} onChange={field('citta')} className={inputClass} />
          <input placeholder="CAP" value={address.cap} onChange={field('cap')} className={inputClass} />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[var(--color-text)] mb-3">🚚 Metodo di spedizione</h3>
        <div className="space-y-2">
          {shippingMethods.map((m) => (
            <label
              key={m}
              className={`
                flex items-center gap-3 p-3 rounded-[var(--radius-md)] border-2 cursor-pointer transition-colors
                ${shipping === m ? 'border-[var(--color-primary)] bg-[var(--color-background-secondary)]' : 'border-[var(--color-border)]'}
              `}
            >
              <input
                type="radio"
                name="shipping"
                value={m}
                checked={shipping === m}
                onChange={() => onShippingChange(m)}
                className="accent-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text)]">{shippingLabel(m)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
