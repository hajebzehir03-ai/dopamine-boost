import type { OrderStatus } from '@/types/order'

const STATUS_DELAYS_HOURS: Record<OrderStatus, number> = {
  confermato: 0,
  preparazione: 3,
  spedito: 10,
  transito: 24,
  consegna: 48,
  consegnato: 60,
}

export function getSimulatedTimestamp(orderCreatedAt: string, status: OrderStatus): string {
  const base = new Date(orderCreatedAt).getTime()
  const hours = STATUS_DELAYS_HOURS[status]
  return new Date(base + hours * 60 * 60 * 1000).toISOString()
}

export function getCurrentOrderStatus(orderCreatedAt: string): OrderStatus {
  const now = Date.now()
  const base = new Date(orderCreatedAt).getTime()
  const hoursElapsed = (now - base) / (1000 * 60 * 60)

  if (hoursElapsed >= STATUS_DELAYS_HOURS.consegnato) return 'consegnato'
  if (hoursElapsed >= STATUS_DELAYS_HOURS.consegna) return 'consegna'
  if (hoursElapsed >= STATUS_DELAYS_HOURS.transito) return 'transito'
  if (hoursElapsed >= STATUS_DELAYS_HOURS.spedito) return 'spedito'
  if (hoursElapsed >= STATUS_DELAYS_HOURS.preparazione) return 'preparazione'
  return 'confermato'
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    confermato: 'Confermato',
    preparazione: 'In preparazione',
    spedito: 'Spedito',
    transito: 'In transito',
    consegna: 'In consegna',
    consegnato: 'Consegnato',
  }
  return labels[status]
}
