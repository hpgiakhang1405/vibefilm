'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { cn } from '@/lib/utils'
import { EpisodeNavButtons } from './episode-nav-buttons'

interface VideoPlayerProps {
  embedUrl: string
  poster?: string
  className?: string
  autoPlay?: boolean
  onPrevEpisode?: () => void
  onNextEpisode?: () => void
  hasPrevEpisode?: boolean
  hasNextEpisode?: boolean
  episodeLabel?: string
}

export function VideoPlayer({
  embedUrl,
  poster,
  className,
  autoPlay = false,
  onPrevEpisode,
  onNextEpisode,
  hasPrevEpisode = false,
  hasNextEpisode = false,
  episodeLabel
}: VideoPlayerProps) {
  const [hasStartedByUser, setHasStartedByUser] = useState(autoPlay)
  const [loadedEmbedUrl, setLoadedEmbedUrl] = useState<string | null>(autoPlay ? null : null)
  const hasStarted = autoPlay || hasStartedByUser
  const isLoading = hasStarted && loadedEmbedUrl !== embedUrl

  const handlePlay = () => {
    setHasStartedByUser(true)
  }

  const handleIframeLoad = () => {
    setLoadedEmbedUrl(embedUrl)
  }

  return (
    <div className={cn('relative w-full aspect-video bg-black rounded-2xl overflow-hidden', className)}>
      {/* Loading Overlay with blurred poster */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Blurred poster background */}
            {poster && (
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={poster}
                  alt="Loading"
                  fill
                  className="object-cover opacity-40 blur-md scale-105"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            )}

            {/* Loading spinner */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <p className="text-white/80 text-sm font-medium">Đang tải...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poster with Play Button - initial state */}
      {!hasStarted && (
        <div className="absolute inset-0 cursor-pointer z-20" onClick={handlePlay}>
          {poster && <ImageWithFallback src={poster} alt="Video poster" fill className="object-cover" priority />}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/30" />

          {/* Episode Navigation on poster */}
          <EpisodeNavButtons
            onPrevEpisode={onPrevEpisode}
            onNextEpisode={onNextEpisode}
            hasPrevEpisode={hasPrevEpisode}
            hasNextEpisode={hasNextEpisode}
            episodeLabel={episodeLabel}
            variant="poster"
          />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <div className="absolute inset-0 w-20 h-20 bg-primary/50 rounded-full blur-xl -m-2" />
              <Button
                size="icon"
                className="relative h-20 w-20 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/50 border-2 border-white/30"
              >
                <Play className="h-8 w-8 fill-white ml-1" />
              </Button>
            </motion.div>
          </div>

          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm">Nhấn để xem phim</p>
        </div>
      )}

      {/* Embed iframe - only rendered when we have a src */}
      {hasStarted && (
        <iframe
          key={embedUrl}
          src={embedUrl}
          className="absolute inset-0 w-full h-full z-10"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          title="Video Player"
          onLoad={handleIframeLoad}
        />
      )}

      {/* Episode Navigation on embed */}
      {hasStarted && !isLoading && (
        <EpisodeNavButtons
          onPrevEpisode={onPrevEpisode}
          onNextEpisode={onNextEpisode}
          hasPrevEpisode={hasPrevEpisode}
          hasNextEpisode={hasNextEpisode}
          episodeLabel={episodeLabel}
          variant="overlay"
        />
      )}
    </div>
  )
}
