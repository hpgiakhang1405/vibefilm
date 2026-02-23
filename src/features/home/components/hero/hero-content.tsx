'use client'

import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Play, Info } from 'lucide-react'
import { Movie } from '@/types'
import { Button } from '@/components/ui/button'
import { UI_TEXT, BADGE_TEXT, APP_ROUTES } from '@/lib/constants'
import {
  QualityBadge,
  RatingBadge,
  MetaText,
  CountryBadge,
  LangBadge,
  EpisodeBadge
} from '@/components/ui/movie-badges'

interface HeroContentProps {
  movie: Movie
  isActive: boolean
}

// --- VARIANTS ---
const CINEMA_EASE = [0.25, 1, 0.5, 1] as const

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4
    }
  }
}

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: CINEMA_EASE
    }
  }
}

const titleVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
    rotateX: 15
  },
  show: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.4,
      ease: CINEMA_EASE
    }
  }
}

export function HeroContent({ movie, isActive }: HeroContentProps) {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-20 px-4 md:px-12 lg:px-16 pb-24 md:pb-40 pointer-events-none">
      <AnimatePresence mode="wait" initial={true}>
        {isActive && (
          <motion.div
            key={`content-${movie._id}`}
            className="max-w-4xl space-y-5 md:space-y-7 pointer-events-auto will-change-transform"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            style={{ WebkitTransform: 'translateZ(0)' }}
          >
            {/* CATEGORY & YEAR */}
            <motion.div className="flex items-center gap-3 tracking-wider" variants={revealVariants}>
              <div className="text-primary font-black text-xl md:text-2xl uppercase drop-shadow-md">
                {movie.category?.[0]?.name ? `PHIM ${movie.category[0].name}` : UI_TEXT.MOVIE_NEW}
              </div>

              <MetaText className="text-gray-200 font-black text-xl md:text-2xl uppercase drop-shadow-md" size="lg">
                {movie.year || UI_TEXT.NA}
              </MetaText>
            </motion.div>

            {/* TITLE */}
            <motion.h1
              className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.2] tracking-tighter drop-shadow-2xl"
              variants={titleVariants}
            >
              {movie.name}
            </motion.h1>

            {/* BADGES GROUP */}
            <motion.div variants={revealVariants} className="flex flex-wrap items-center gap-4">
              {/* Boxed Group: Rating & Quality */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
                <RatingBadge
                  score={movie.tmdb?.vote_average || movie.imdb?.vote_average || 0}
                  count={movie.tmdb?.vote_count || movie.imdb?.vote_count}
                  size="lg"
                />
                <QualityBadge size="lg">{movie.quality || BADGE_TEXT.HD}</QualityBadge>
                <EpisodeBadge size="lg">{movie.episode_current || BADGE_TEXT.FULL}</EpisodeBadge>
              </div>

              {/* Unboxed Items */}
              <div className="flex items-center gap-4 text-white/90">
                {movie.country?.[0] && <CountryBadge country={movie.country[0]} size="lg" />}
                <LangBadge size="lg">{movie.lang || BADGE_TEXT.SUBTITLE}</LangBadge>
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              className="text-sm md:text-lg text-gray-300/90 line-clamp-3 md:line-clamp-2 max-w-2xl leading-relaxed font-normal drop-shadow-md italic"
              variants={revealVariants}
            >
              {movie.origin_name && movie.origin_name !== movie.name
                ? movie.origin_name
                : `Xem phim ${movie.name} vietsub thuyết minh chất lượng cao.`}
            </motion.p>

            {/* BUTTONS WITH HOVER EFFECTS */}
            <motion.div className="flex flex-wrap gap-3 pt-4" variants={revealVariants}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold gap-2 bg-white text-black hover:bg-gray-200 rounded-lg border-0 shadow-lg"
                >
                  <Link href={`${APP_ROUTES.MOVIE}/${movie.slug}`}>
                    <Play className="h-5 w-5 md:h-6 md:w-6 fill-black" /> {UI_TEXT.WATCH_NOW}
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold gap-2 bg-gray-500/60 text-white hover:bg-gray-500/80 rounded-lg border-0 backdrop-blur-sm"
                >
                  <Link href={`${APP_ROUTES.MOVIE}/${movie.slug}`}>
                    <Info className="h-5 w-5 md:h-6 md:w-6" /> {UI_TEXT.MORE_INFO}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
