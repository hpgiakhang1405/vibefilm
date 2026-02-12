'use client'

import { motion } from 'framer-motion'
import { Film } from 'lucide-react'
import dynamic from 'next/dynamic'
import { UI_TEXT } from '@/lib/constants'

// Lazy load VideoPlayer
const VideoPlayer = dynamic(() => import('@/features/watch/components/video-player').then((mod) => mod.VideoPlayer), {
  loading: () => (
    <div className="aspect-video w-full bg-black/50 animate-pulse flex items-center justify-center rounded-2xl">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  ),
  ssr: false
})

interface MoviePlayerProps {
  currentEpisode?: {
    link_embed?: string
    link_m3u8?: string
  }
  posterUrl: string
  shouldAutoPlay: boolean
}

export function MoviePlayer({ currentEpisode, posterUrl, shouldAutoPlay }: MoviePlayerProps) {
  return (
    <motion.div
      id="video-player-section"
      className="max-w-7xl mx-auto mb-10 scroll-mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-50" />

        <div className="relative aspect-video w-full bg-black">
          {currentEpisode?.link_embed || currentEpisode?.link_m3u8 ? (
            <VideoPlayer
              embedUrl={currentEpisode.link_embed || currentEpisode.link_m3u8 || ''}
              poster={posterUrl}
              autoPlay={shouldAutoPlay}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
              <div className="text-center space-y-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                  <Film className="w-20 h-20 text-gray-600 mx-auto" />
                </motion.div>
                <p className="text-gray-400 text-lg">{UI_TEXT.MOVIE_UPDATING}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
