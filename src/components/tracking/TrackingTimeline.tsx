import { motion } from 'framer-motion'
import type { TrackingStep } from '@/types/tracking'
import { formatDate } from '@/utils/formatters'

interface TrackingTimelineProps {
  steps: TrackingStep[]
}

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, idx) => (
        <motion.div
          key={step.status}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.08 }}
          className="flex gap-4"
        >
          {/* Dot + line */}
          <div className="flex flex-col items-center">
            <div className={`
              w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 z-10
              ${step.current ? 'tracking-current bg-[var(--color-primary)] text-white shadow-lg' : ''}
              ${step.completed ? 'bg-[var(--color-success)] text-white' : ''}
              ${!step.completed && !step.current ? 'bg-[var(--color-border)] text-[var(--color-text-muted)]' : ''}
            `}>
              {step.emoji}
            </div>
            {idx < steps.length - 1 && (
              <div className={`
                w-0.5 flex-1 my-1 min-h-[2rem]
                ${step.completed ? 'bg-[var(--color-success)]' : 'bg-[var(--color-border)]'}
              `} />
            )}
          </div>

          {/* Content */}
          <div className={`pb-6 ${idx === steps.length - 1 ? 'pb-0' : ''}`}>
            <p className={`font-semibold text-sm ${
              step.current ? 'text-[var(--color-primary)]' :
              step.completed ? 'text-[var(--color-text)]' :
              'text-[var(--color-text-muted)]'
            }`}>
              {step.label}
              {step.current && <span className="ml-2 text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">In corso</span>}
            </p>
            {(step.completed || step.current) && (
              <>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{step.location}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{formatDate(step.timestamp)}</p>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
