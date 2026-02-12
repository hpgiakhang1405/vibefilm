import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export function MovieDetailSkeleton() {
  return (
    <div className="relative min-h-screen">
      <div className="pt-28 pb-16 px-4 md:px-8 lg:px-12">
        {/* --- HERO SECTION --- */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="w-50 md:w-60 lg:w-80 shrink-0 mx-auto lg:mx-0">
              <div className="relative aspect-2/3 rounded-2xl overflow-hidden border border-white/10">
                <Skeleton className="w-full h-full" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-5 w-full">
              {/* Title & Origin Name */}
              <div>
                <Skeleton className="h-10 md:h-14 lg:h-16 w-3/4 mb-4 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-md" />
              </div>

              {/* Rating & Stats Bar */}
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-8 w-16 rounded-md" /> {/* Rating */}
                <Skeleton className="h-8 w-20 rounded-md" /> {/* Episode */}
                <Skeleton className="h-8 w-24 rounded-md" /> {/* Time */}
                <Skeleton className="h-8 w-16 rounded-md" /> {/* Year */}
              </div>

              {/* Quality & Lang */}
              <div className="flex items-center flex-wrap gap-2">
                <Skeleton className="h-7 w-12 rounded-md" />
                <Skeleton className="h-7 w-20 rounded-md" />
                <Skeleton className="h-7 w-24 rounded-md" />
              </div>

              {/* Categories */}
              <div className="flex items-center flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Description Lines */}
              <div className="space-y-2 max-w-3xl pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center flex-wrap gap-3 pt-2">
                <Skeleton className="h-10 w-32 rounded-lg" /> {/* Watch */}
                <Skeleton className="h-10 w-32 rounded-lg" /> {/* Trailer */}
              </div>
            </div>
          </div>
        </div>

        {/* --- VIDEO PLAYER PLACEHOLDER --- */}
        <div className="max-w-7xl mx-auto w-full aspect-video bg-white/5 rounded-xl animate-pulse mb-10 border border-white/5" />

        {/* --- EPISODE LIST --- */}
        <div className="max-w-7xl mx-auto mb-10 space-y-4">
          <Skeleton className="h-8 w-48 rounded-lg" /> {/* Header */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg w-full" />
            ))}
          </div>
        </div>

        {/* --- INFO GRID (Content + Sidebar) --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 h-full min-h-75">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="h-8 w-40 rounded-lg" />
              </div>
              <Separator className="mb-5 bg-white/10" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Cast & Crew */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <Skeleton className="h-7 w-24 mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
