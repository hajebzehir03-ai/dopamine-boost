import { useMemo } from 'react'
import type { Order } from '@/types/order'
import { buildTrackingSteps, buildTrackingRoute } from '@/services/TrackingSimulator'

export function useTracking(order: Order | undefined) {
  const steps = useMemo(() => (order ? buildTrackingSteps(order) : []), [order])
  const route = useMemo(() => (order ? buildTrackingRoute(order) : null), [order])

  const currentStep = steps.find((s) => s.current)
  const completedCount = steps.filter((s) => s.completed).length

  return { steps, route, currentStep, completedCount }
}
