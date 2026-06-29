import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrackingCodeProps {
  code: string
}

export function TrackingCode({ code }: TrackingCodeProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 bg-[var(--color-background-secondary)] rounded-[var(--radius-lg)] p-3 border border-[var(--color-border)]">
      <span className="font-mono text-sm text-[var(--color-primary)] flex-1 tracking-wider">{code}</span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={copy}
        className="text-sm px-3 py-1 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-medium"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="copied" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ Copiato</motion.span>
          ) : (
            <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Copia</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
