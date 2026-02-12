import { Skeleton } from '@/components/ui/skeleton'
import { SKELETON_COUNTS } from '@/lib/constants'

export function MovieListSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Cinematic Header Skeleton */}
      <div className="relative mb-8 px-4 md:px-12">
        <div className="absolute -top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <Skeleton className="h-10 md:h-14 w-64 mb-4 rounded-lg" />

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>
      </div>

      {/* Movie Grid Skeleton */}
      <div className="px-4 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
        {Array.from({ length: SKELETON_COUNTS.GRID }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl">
              <Skeleton className="w-full h-full" />
              {/* Optional: Overlay skeleton to simulate gradient text area */}
              <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-linear-to-t from-black via-black/60 to-transparent opacity-50">
                <Skeleton className="h-4 w-3/4 mb-1 bg-white/20" />
                <Skeleton className="h-3 w-1/2 bg-white/20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="px-4 md:px-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Prev */}
            <Skeleton className="h-10 w-10 rounded-md" /> {/* 1 */}
            <Skeleton className="h-10 w-10 rounded-md" /> {/* 2 */}
            <Skeleton className="h-10 w-10 rounded-md" /> {/* 3 */}
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Next */}
          </div>
        </div>
      </div>
    </div>
  )
}
