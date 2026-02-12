'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
// import Image from 'next/image'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { Play } from 'lucide-react'
import { Movie } from '@/types'

import { QualityBadge, EpisodeBadge, MetaText } from '@/components/ui/movie-badges'
import { Calendar, Languages } from 'lucide-react'
import { cn, getMovieImageUrl } from '@/lib/utils'
import { BADGE_TEXT, UI_TEXT, APP_ROUTES } from '@/lib/constants'

interface MovieCardProps {
  movie: Movie
  className?: string
  index?: number
  priority?: boolean
}

export function MovieCard({ movie, className, index = 0, priority = false }: MovieCardProps) {
  const thumbUrl = getMovieImageUrl(movie.thumb_url)

  // Use explicit priority or fallback to index-based logic (only if priority is undefined, but here we default false)
  // Actually, let's allow the parent to strictly control it. If parent passes calculated priority, use it.
  // We can default loading to lazy unless priority is true.
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
    rootMargin: '200px' // Preload when 200px away
  })

  const isVisible = !!entry?.isIntersecting || priority

  return (
    <div ref={ref} data-index={index}>
      <Link
        href={`${APP_ROUTES.MOVIE}/${movie.slug}`}
        className={cn('group relative block rounded-xl overflow-hidden', className)}
      >
        <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/50 bg-surface">
          {/* Image - Conditional Rendering for True Lazy Load */}
          {isVisible && (
            <ImageWithFallback
              src={thumbUrl}
              alt={movie.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              priority={priority}
              quality={75}
              loading={priority ? 'eager' : 'lazy'}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/20" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="bg-white/95 text-black rounded-full p-3 shadow-2xl transform scale-90 transition-transform duration-300 group-hover:scale-100">
              <Play className="h-5 w-5 fill-black" />
            </div>
          </div>

          {/* Quality Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 flex-wrap">
            <QualityBadge>{movie.quality || BADGE_TEXT.HD}</QualityBadge>
            {movie.episode_current && <EpisodeBadge noIcon>{movie.episode_current}</EpisodeBadge>}
          </div>

          {/* Movie Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black via-black/80 to-transparent pt-8">
            <h3 className="line-clamp-1 text-sm md:text-base font-bold text-white leading-tight drop-shadow-md mb-1">
              {movie.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <MetaText icon={Calendar}>{movie.year || UI_TEXT.NA}</MetaText>
              {movie.lang && (
                <MetaText icon={Languages} className="max-w-30 truncate">
                  {movie.lang}
                </MetaText>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
