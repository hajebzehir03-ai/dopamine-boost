import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement

    const panel = panelRef.current
    if (!panel) return

    requestAnimationFrame(() => {
      const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      const first = focusable[0]
      if (first) first.focus()
      else panel.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-card)] rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:rounded-2xl focus:outline-none"
          >
            {title && (
              <div className="flex items-center justify-between mb-4">
                <h2 id="modal-title" className="text-xl font-bold text-[var(--color-text)]">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Chiudi"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1 rounded-[var(--radius-sm)] transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
