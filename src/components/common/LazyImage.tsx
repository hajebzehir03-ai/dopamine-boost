import { memo, useState, useEffect } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  fallback?: string
}

const FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Cpath d='M85 110 l15-20 10 13 7-9 13 16z' fill='%23ccc'/%3E%3Ccircle cx='75' cy='85' r='8' fill='%23ccc'/%3E%3C/svg%3E"

export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallback = FALLBACK_SVG,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => { setLoaded(false); setError(false) }, [src])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-200 ${imgClassName} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true) }}
      />
    </div>
  )
})
