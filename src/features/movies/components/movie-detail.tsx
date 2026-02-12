'use client'

import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { APP_DOMAIN_CDN_IMAGE } from '@/lib/axios'
import dynamic from 'next/dynamic'
import { MovieHero } from '@/features/movies/components/movie/movie-hero'
import { MovieInfo } from '@/features/movies/components/movie/movie-info'
import { Keyword, MovieDetail, MovieImage } from '@/types'
import { useEpisodeManager } from '@/hooks/use-episode-manager'
import { useScrollTo } from '@/hooks/use-scroll-to'
import { DOM_IDS, SCROLL_OFFSETS } from '@/lib/constants'

// Lazy load heavy components
const EpisodeList = dynamic(() => import('@/features/watch/components/episode-list').then((mod) => mod.EpisodeList), {
  loading: () => <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
})

const MoviePlayer = dynamic(
  () => import('@/features/movies/components/movie/movie-player').then((mod) => mod.MoviePlayer),
  {
    loading: () => <div className="aspect-video w-full bg-black/50 rounded-xl animate-pulse" />,
    ssr: false // Player often uses window/document
  }
)

const ImageGalleryCard = dynamic(() =>
  import('@/features/movies/components/movie/image-gallery-card').then((mod) => mod.ImageGalleryCard)
)

interface MovieDetailClientProps {
  movie: MovieDetail
  keywords?: Keyword[]
  images?: MovieImage[]
}

export function MovieDetailClient({ movie, keywords = [], images = [] }: MovieDetailClientProps) {
  // Use custom hooks
  const { currentServer, currentEpisode, shouldAutoPlay, handleEpisodeChange } = useEpisodeManager({ movie })

  const { scrollToId } = useScrollTo()

  const scrollToVideoPlayer = useCallback(() => {
    scrollToId(DOM_IDS.VIDEO_PLAYER_SECTION, { offset: SCROLL_OFFSETS.VIDEO_PLAYER })
  }, [scrollToId])

  // Watch for autoplay to scroll
  useEffect(() => {
    if (shouldAutoPlay) {
      // Small delay to ensure render
      setTimeout(scrollToVideoPlayer, 100)
    }
  }, [shouldAutoPlay, currentEpisode, scrollToVideoPlayer])

  const posterUrl = movie.poster_url.startsWith('http')
    ? movie.poster_url
    : `${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="pt-28 pb-16 px-4 md:px-8 lg:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <MovieHero movie={movie} onWatchClick={scrollToVideoPlayer} />

        {/* Video Player Section */}
        <div id={DOM_IDS.VIDEO_PLAYER_SECTION}>
          <MoviePlayer currentEpisode={currentEpisode} posterUrl={posterUrl} shouldAutoPlay={shouldAutoPlay} />
        </div>

        {/* Episode List */}
        <motion.div
          className="max-w-7xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EpisodeList
            episodes={movie.episodes}
            currentEpisodeSlug={currentEpisode?.slug || ''}
            currentServerName={currentServer}
            onChangeEpisode={handleEpisodeChange}
          />
        </motion.div>

        {/* Info Cards Grid */}
        <MovieInfo movie={movie} keywords={keywords} />

        {/* Image Gallery - Full Width Row */}
        <motion.div
          className="max-w-7xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ImageGalleryCard images={images} />
        </motion.div>
      </motion.div>
    </div>
  )
}
