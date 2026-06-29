export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoString))
}

export function formatShortDate(isoString: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(isoString))
}

export function formatRating(rate: number): string {
  return rate.toFixed(1)
}

export function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

export function discountedPrice(price: number, discountPct: number): number {
  return parseFloat((price * (1 - discountPct / 100)).toFixed(2))
}

export function shippingCost(method: 'standard' | 'express' | 'flash'): number {
  return { standard: 0, express: 4.99, flash: 9.99 }[method]
}

export function shippingLabel(method: 'standard' | 'express' | 'flash'): string {
  return {
    standard: 'Spedizione standard (3-5gg) — Gratis',
    express: 'Express (1-2gg) — €4,99',
    flash: 'Flash (<24h) — €9,99',
  }[method]
}
