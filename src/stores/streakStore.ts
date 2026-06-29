import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StreakStore {
  streak: number
  lastPurchaseDate: string
  recordPurchase: () => void
  getStreakEmoji: () => string
}

function todayString() {
  return new Date().toDateString()
}

function yesterdayString() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toDateString()
}

export const useStreakStore = create<StreakStore>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastPurchaseDate: '',

      recordPurchase: () => {
        const today = todayString()
        const { lastPurchaseDate, streak } = get()

        if (lastPurchaseDate === today) return

        const newStreak = lastPurchaseDate === yesterdayString() ? streak + 1 : 1
        set({ streak: newStreak, lastPurchaseDate: today })
      },

      getStreakEmoji: () => {
        const { streak } = get()
        if (streak >= 30) return '🔥×30'
        if (streak >= 7) return '🔥×7'
        if (streak >= 3) return '🔥×3'
        return `🔥×${streak}`
      },
    }),
    { name: 'cartrush-streak' }
  )
)
