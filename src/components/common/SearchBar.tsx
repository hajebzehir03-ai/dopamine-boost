import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Cerca prodotti…' }: SearchBarProps) {
  const [local, setLocal] = useState(value)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return }
    const t = setTimeout(() => onChangeRef.current(local), 350)
    return () => clearTimeout(t)
  }, [local])

  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
      />
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="search-input w-full pl-[38px] pr-4 h-11 bg-[var(--color-background-secondary)] rounded-[13px] text-[14px] font-medium text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none border border-transparent focus:border-[var(--color-primary)] transition-colors"
      />
    </div>
  )
}
