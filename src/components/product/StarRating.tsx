import { Star } from 'lucide-react'

interface StarRatingProps {
  rate: number
  count: number
  size?: number
}

export function StarRating({ rate, count, size = 10 }: StarRatingProps) {
  const filled = Math.round(rate)
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rate} su 5 (${count} recensioni)`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={i < filled
            ? 'text-[var(--color-accent)] fill-[var(--color-accent)]'
            : 'text-[var(--color-border)] fill-[var(--color-border)]'}
        />
      ))}
      <span className="text-[10px] text-[var(--color-text-muted)] ml-1" aria-hidden="true">({count})</span>
    </div>
  )
}
