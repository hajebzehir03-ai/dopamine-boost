import { useBudgetStore, DAILY_BUDGET } from '@/stores/budgetStore'

export function useBudget() {
  const { remaining, spend, checkAndReset } = useBudgetStore()
  checkAndReset()
  const used = DAILY_BUDGET - remaining
  const percent = Math.min(100, (used / DAILY_BUDGET) * 100)
  return { remaining, used, percent, total: DAILY_BUDGET, spend }
}
