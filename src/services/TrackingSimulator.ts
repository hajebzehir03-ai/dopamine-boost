import type { Order, OrderStatus } from '@/types/order'
import type { TrackingStep, TrackingRoute } from '@/types/tracking'
import { TRACKING_STEPS } from '@/types/tracking'
import { getCurrentOrderStatus, getSimulatedTimestamp } from '@/utils/timeSimulator'

const ITALIAN_CITIES: { name: string; coords: [number, number] }[] = [
  { name: 'Milano', coords: [45.4642, 9.19] },
  { name: 'Bologna', coords: [44.4938, 11.3426] },
  { name: 'Firenze', coords: [43.7696, 11.2558] },
  { name: 'Roma', coords: [41.9028, 12.4964] },
  { name: 'Napoli', coords: [40.8518, 14.2681] },
  { name: 'Torino', coords: [45.0703, 7.6869] },
  { name: 'Venezia', coords: [45.4408, 12.3155] },
  { name: 'Genova', coords: [44.4056, 8.9463] },
]

const LOCATION_LABELS: Record<OrderStatus, string> = {
  confermato: 'Magazzino CartRush — Milano',
  preparazione: 'Centro smistamento — Milano Segrate',
  spedito: 'Hub logistico — Bologna Interporto',
  transito: 'Scalo aereo — Roma Fiumicino',
  consegna: 'Deposito locale — vicino a te',
  consegnato: 'Consegnato al tuo indirizzo',
}

const STATUS_ORDER: OrderStatus[] = ['confermato', 'preparazione', 'spedito', 'transito', 'consegna', 'consegnato']

export function buildTrackingSteps(order: Order): TrackingStep[] {
  const currentStatus = getCurrentOrderStatus(order.createdAt)
  const currentIdx = STATUS_ORDER.indexOf(currentStatus)

  return TRACKING_STEPS.map((step, idx) => ({
    ...step,
    location: LOCATION_LABELS[step.status],
    timestamp: getSimulatedTimestamp(order.createdAt, step.status),
    completed: idx < currentIdx,
    current: idx === currentIdx,
  }))
}

export function buildTrackingRoute(order: Order): TrackingRoute {
  const currentStatus = getCurrentOrderStatus(order.createdAt)
  const currentIdx = STATUS_ORDER.indexOf(currentStatus)

  const from = ITALIAN_CITIES[0].coords
  const to = ITALIAN_CITIES[Math.floor(Math.random() * (ITALIAN_CITIES.length - 2)) + 2].coords
  const waypoints = ITALIAN_CITIES.slice(1, 3).map((c) => c.coords) as [number, number][]

  const progress = currentIdx / (STATUS_ORDER.length - 1)
  const currentPosition: [number, number] = [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
  ]

  return { from, to, waypoints, currentPosition, progress }
}
