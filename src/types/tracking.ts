import type { OrderStatus } from './order'

export interface TrackingStep {
  status: OrderStatus
  label: string
  emoji: string
  location: string
  timestamp: string
  completed: boolean
  current: boolean
}

export interface TrackingRoute {
  from: [number, number]
  to: [number, number]
  waypoints: [number, number][]
  currentPosition: [number, number]
  progress: number
}

export const TRACKING_STEPS: { status: OrderStatus; label: string; emoji: string }[] = [
  { status: 'confermato', label: 'Ordine confermato', emoji: '✅' },
  { status: 'preparazione', label: 'In preparazione', emoji: '📦' },
  { status: 'spedito', label: 'Spedito', emoji: '🚚' },
  { status: 'transito', label: 'In transito', emoji: '✈️' },
  { status: 'consegna', label: 'In consegna', emoji: '🏘️' },
  { status: 'consegnato', label: 'Consegnato', emoji: '🎉' },
]
