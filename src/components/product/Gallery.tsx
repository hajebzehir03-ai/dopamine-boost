import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryProps {
  images: string[]
  alt: string
}

export function Gallery({ images, alt }: GalleryProps) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-background-secondary)] aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={images[current]}
            alt={alt}
            className="w-full h-full object-contain p-4"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`
                flex-shrink-0 w-14 h-14 rounded-[var(--radius-md)] overflow-hidden border-2 transition-colors
                ${i === current ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'}
              `}
            >
              <img src={img} alt="" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
