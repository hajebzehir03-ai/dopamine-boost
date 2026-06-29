import { useState, useEffect, useRef } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Cerca prodotti…' }: SearchBarProps) {
  const [local, setLocal] = useState(value)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const t = setTimeout(() => onChangeRef.current(local), 350)
    return () => clearTimeout(t)
  }, [local])

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
        🔍
      </span>
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5
          bg-[var(--color-background-secondary)]
          border border-[var(--color-border)]
          rounded-[var(--radius-lg)]
          text-[var(--color-text)]
          placeholder:text-[var(--color-text-muted)]
          focus:outline-none focus:border-[var(--color-primary)]
          transition-colors
        "
      />
    </div>
  )
}
