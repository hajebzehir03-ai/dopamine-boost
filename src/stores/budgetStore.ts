import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DAILY_BUDGET = 500

interface BudgetStore {
  remaining: number
  lastReset: string
  spend: (amount: number) => void
  reset: () => void
  checkAndReset: () => void
  percentUsed: () => number
}

function todayString() {
  return new Date().toDateString()
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      remaining: DAILY_BUDGET,
      lastReset: todayString(),

      spend: (amount) => {
        get().checkAndReset()
        set({ remaining: Math.max(0, get().remaining - amount) })
      },

      reset: () => set({ remaining: DAILY_BUDGET, lastReset: todayString() }),

      checkAndReset: () => {
        if (get().lastReset !== todayString()) {
          get().reset()
        }
      },

      percentUsed: () => {
        const remaining = get().remaining
        return ((DAILY_BUDGET - remaining) / DAILY_BUDGET) * 100
      },
    }),
    { name: 'cartrush-budget' }
  )
)

export { DAILY_BUDGET }
