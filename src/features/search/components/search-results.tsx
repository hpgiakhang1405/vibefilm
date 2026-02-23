'use client'

import * as React from 'react'
import { Movie } from '@/types'
import { APP_DOMAIN_CDN_IMAGE } from '@/lib/axios'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { Button } from '@/components/ui/button'
import { Search, Film, AlertTriangle } from 'lucide-react'
import { QualityBadge, EpisodeBadge } from '@/components/ui/movie-badges'
import { UI_TEXT, BADGE_TEXT } from '@/lib/constants'

interface SearchResultsProps {
  results: Movie[]
  isOpen: boolean
  query: string
  error?: string | null
  onResultClick: (slug: string) => void
  onViewAllClick: () => void
  dropdownRef: React.RefObject<HTMLDivElement>
}

export function SearchResults({
  results,
  isOpen,
  query,
  error,
  onResultClick,
  onViewAllClick,
  dropdownRef
}: SearchResultsProps) {
  if (!isOpen) return null

  // Case 1: Error
  if (error) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-xl border border-red-500/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="p-6 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-xs text-gray-500 mt-1">Vui lòng thử lại sau giây lát</p>
        </div>
      </div>
    )
  }

  // Case 2: Has results
  if (results.length > 0) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {results.map((movie, index) => {
            const thumbUrl = movie.thumb_url.startsWith('http')
              ? movie.thumb_url
              : `${APP_DOMAIN_CDN_IMAGE}/${movie.thumb_url}`

            return (
              <div
                key={movie._id}
                onClick={() => onResultClick(movie.slug)}
                className="flex items-start gap-4 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative w-18 aspect-2/3 shrink-0 rounded-md overflow-hidden bg-white/10">
                  <ImageWithFallback
                    src={thumbUrl}
                    alt={movie.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="64px"
                    priority={index < 6}
                    quality={60}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-base font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
                    {movie.name}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {movie.origin_name} ({movie.year})
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <QualityBadge size="sm">{movie.quality || BADGE_TEXT.HD}</QualityBadge>
                    {movie.episode_current && (
                      <EpisodeBadge size="sm" noIcon>
                        {movie.episode_current}
                      </EpisodeBadge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Results */}
        <div className="border-t border-white/10 p-2 bg-white/5">
          <Button
            variant="ghost"
            className="w-full justify-center h-10 text-sm font-medium hover:text-primary hover:bg-white/5 transition-all"
            onClick={onViewAllClick}
          >
            <Search className="w-4 h-4 mr-2" />
            {UI_TEXT.VIEW_ALL_RESULTS} &quot;{query}&quot;
          </Button>
        </div>
      </div>
    )
  }

  // Case 3: No results found (but query exists)
  if (query.length >= 2) {
    return (
      <div
        ref={dropdownRef}
        className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Film className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-white font-medium text-lg">{UI_TEXT.NO_RESULTS}</p>
          <p className="text-sm text-gray-500 mt-2 max-w-50 mx-auto">{UI_TEXT.TRY_ANOTHER_KEYWORD}</p>
        </div>
      </div>
    )
  }

  return null
}
