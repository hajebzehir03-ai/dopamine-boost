import { useEffect } from 'react'
import { useBudgetStore, DAILY_BUDGET } from '@/stores/budgetStore'

export function useBudget() {
  const remaining = useBudgetStore(state => state.remaining)
  const spend = useBudgetStore(state => state.spend)
  const checkAndReset = useBudgetStore(state => state.checkAndReset)

  useEffect(() => { checkAndReset() }, [checkAndReset])

  const used = DAILY_BUDGET - remaining
  const percent = Math.min(100, (used / DAILY_BUDGET) * 100)
  return { remaining, used, percent, total: DAILY_BUDGET, spend }
}
