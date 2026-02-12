'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EpisodeNavButtonsProps {
  onPrevEpisode?: () => void
  onNextEpisode?: () => void
  hasPrevEpisode?: boolean
  hasNextEpisode?: boolean
  episodeLabel?: string
  className?: string
  variant?: 'poster' | 'overlay'
}

export function EpisodeNavButtons({
  onPrevEpisode,
  onNextEpisode,
  hasPrevEpisode = false,
  hasNextEpisode = false,
  episodeLabel,
  className,
  variant = 'poster'
}: EpisodeNavButtonsProps) {
  if (!hasPrevEpisode && !hasNextEpisode) return null

  // Styles based on variant
  const containerStyles =
    variant === 'poster'
      ? 'absolute top-4 left-4 flex items-center gap-2 z-10'
      : 'absolute top-4 left-4 flex items-center gap-2 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300'

  const buttonBaseStyles = 'h-9 w-9 text-white disabled:opacity-30'
  const buttonBgStyles =
    variant === 'poster' ? 'bg-black/50 hover:bg-black/70' : 'bg-black/70 hover:bg-black/90 backdrop-blur-sm'

  return (
    <div className={cn(containerStyles, className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(buttonBaseStyles, buttonBgStyles)}
        onClick={(e) => {
          e.stopPropagation()
          onPrevEpisode?.()
        }}
        disabled={!hasPrevEpisode}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      {episodeLabel && (
        <span
          className={cn(
            'text-white text-sm font-medium px-3 py-1.5 rounded-lg',
            variant === 'poster' ? 'bg-black/50' : 'bg-black/70 backdrop-blur-sm'
          )}
        >
          {episodeLabel}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(buttonBaseStyles, buttonBgStyles)}
        onClick={(e) => {
          e.stopPropagation()
          onNextEpisode?.()
        }}
        disabled={!hasNextEpisode}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
