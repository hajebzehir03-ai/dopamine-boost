import { useEffect, useRef } from 'react'
import type { TrackingRoute } from '@/types/tracking'

interface TrackingMapProps {
  route: TrackingRoute
}

export function TrackingMap({ route }: TrackingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    let map: ReturnType<typeof import('leaflet').map>
    let markerInterval: ReturnType<typeof setInterval>

    import('leaflet')
      .then((L) => {
        if (!mapRef.current) return

        map = L.map(mapRef.current, { zoomControl: false, attributionControl: false })
        mapInstanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }).addTo(map)

        const allPoints: [number, number][] = [route.from, ...route.waypoints, route.to]
        const polyline = L.polyline(allPoints, {
          color: 'var(--color-primary, #FF2060)',
          weight: 3,
          dashArray: '6 4',
          opacity: 0.7,
        }).addTo(map)

        map.fitBounds(polyline.getBounds(), { padding: [30, 30] })

        const truckIcon = L.divIcon({
          html: '<div style="font-size:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">🚚</div>',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          className: '',
        })

        const marker = L.marker(route.currentPosition, { icon: truckIcon }).addTo(map)

        let bounce = 0
        markerInterval = setInterval(() => {
          bounce += 0.1
          const offset = Math.sin(bounce) * 0.003
          const pos = marker.getLatLng()
          marker.setLatLng([pos.lat + offset, pos.lng])
        }, 500)

        L.circleMarker(route.from, {
          radius: 8, color: '#00C853', fillColor: '#00C853', fillOpacity: 1,
        }).addTo(map).bindPopup('🏭 Partenza')

        L.circleMarker(route.to, {
          radius: 8, color: '#FF2060', fillColor: '#FF2060', fillOpacity: 1,
        }).addTo(map).bindPopup('🏠 Destinazione')
      })
      .catch((err: unknown) => {
        console.error('[TrackingMap] Leaflet failed to load:', err)
      })

    return () => {
      clearInterval(markerInterval)
      if (map) map.remove()
      mapInstanceRef.current = null
    }
  }, [route])

  return (
    <div
      ref={mapRef}
      className="w-full h-56 rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)]"
    />
  )
}
