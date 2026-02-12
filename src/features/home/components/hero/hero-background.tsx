'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { Movie } from '@/types'
import { APP_DOMAIN_CDN_IMAGE } from '@/lib/axios'

interface HeroBackgroundProps {
  movie: Movie
  isActive: boolean
  direction: number
  priority?: boolean
}

// --- CONSTANTS & VARIANTS ---
const CINEMA_EASE = [0.25, 1, 0.5, 1] as const

const bgVariants: Variants = {
  enter: (_: number) => ({
    opacity: 0,
    scale: 1,
    filter: 'blur(8px) brightness(0.4)'
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 1.5,
      ease: CINEMA_EASE
    }
  },
  exit: (_: number) => ({
    opacity: 0,
    scale: 1.05,
    filter: 'blur(4px) brightness(0.6)',
    transition: {
      duration: 0.8,
      ease: CINEMA_EASE
    }
  })
}

const zoomInVariants: Variants = {
  animate: {
    x: 0,
    scale: [1, 1.15],
    transition: {
      duration: 20,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
}

// Helper to get poster URL
const getMoviePosterUrl = (movie: Movie): string => {
  let validPosterUrl = movie.poster_url

  if (!validPosterUrl && movie.thumb_url) {
    validPosterUrl = movie.thumb_url.includes('thumb') ? movie.thumb_url.replace('thumb', 'poster') : movie.thumb_url
  }

  if (!validPosterUrl) return ''

  return validPosterUrl.startsWith('http') ? validPosterUrl : `${APP_DOMAIN_CDN_IMAGE}/${validPosterUrl}`
}

export function HeroBackground({ movie, isActive, direction, priority = false }: HeroBackgroundProps) {
  const posterUrl = getMoviePosterUrl(movie)

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-[#050505]">
      <AnimatePresence mode="popLayout" initial={true} custom={direction}>
        {isActive && (
          <motion.div
            key={`bg-${movie._id}`}
            className="absolute inset-0 z-0"
            custom={direction}
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* 1. Base Image with Zoom In */}
            <motion.div className="w-full h-full relative" variants={zoomInVariants} animate="animate">
              <ImageWithFallback
                src={posterUrl}
                alt={movie.name}
                fill
                className="object-cover object-center"
                priority={priority}
                sizes="100vw"
                quality={90}
              />
            </motion.div>

            {/* 2. Gradient Vignette */}
            <div className="absolute inset-0 bg-linear-to-t from-[#000000] via-[#000000]/40 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-[#000000]/95 via-[#000000]/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
