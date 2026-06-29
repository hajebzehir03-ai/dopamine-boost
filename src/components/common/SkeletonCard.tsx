export function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="skeleton aspect-square w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
      </div>
    </div>
  )
}
