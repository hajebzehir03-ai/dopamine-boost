import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'success' | 'flash' | 'accent' | 'muted'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'bg-[var(--color-primary)] text-white',
  success: 'bg-[var(--color-success)] text-white',
  flash: 'bg-[var(--color-flash)] text-white',
  accent: 'bg-[var(--color-accent)] text-[var(--color-text)]',
  muted: 'bg-[var(--color-border)] text-[var(--color-text-muted)]',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({ children, variant = 'primary', size = 'sm' }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center rounded-full font-semibold
      ${variants[variant]} ${sizes[size]}
    `}>
      {children}
    </span>
  )
}
