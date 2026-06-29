import { useStreakStore } from '@/stores/streakStore'

export function useStreak() {
  const { streak, recordPurchase, getStreakEmoji } = useStreakStore()
  return { streak, recordPurchase, emoji: getStreakEmoji() }
}
