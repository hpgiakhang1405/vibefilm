'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Globe, Play } from 'lucide-react'
import { MovieDetail } from '@/types'
import { APP_DOMAIN_CDN_IMAGE } from '@/lib/axios'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import {
  QualityBadge,
  RatingBadge,
  LangBadge,
  EpisodeBadge,
  CountryBadge,
  MetaText
} from '@/components/ui/movie-badges'
import { BADGE_TEXT, UI_TEXT } from '@/lib/constants'
import DOMPurify from 'isomorphic-dompurify'

interface MovieHeroProps {
  movie: MovieDetail
  onWatchClick: () => void
}

export function MovieHero({ movie, onWatchClick }: MovieHeroProps) {
  const thumbUrl = movie.thumb_url.startsWith('http') ? movie.thumb_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.thumb_url}`

  return (
    <motion.div
      className="max-w-7xl mx-auto mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Poster with Glow */}
        <div className="w-50 md:w-60 lg:w-80 shrink-0 mx-auto lg:mx-0">
          <motion.div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-xl opacity-50" />
            <div className="relative aspect-2/3 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
              <ImageWithFallback
                src={thumbUrl}
                alt={movie.name}
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 240px, 128px"
              />
            </div>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-5">
          {/* Title */}
          <div>
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {movie.name}
            </motion.h1>
            <motion.p
              className="text-lg text-gray-400 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {movie.origin_name} ({movie.year})
            </motion.p>
          </div>

          {/* Rating & Stats Bar */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RatingBadge
              score={movie.tmdb?.vote_average || movie.imdb?.vote_average || 0}
              count={movie.tmdb?.vote_count || movie.imdb?.vote_count}
              showCount
              size="lg"
            />

            <EpisodeBadge size="lg">{movie.episode_current || BADGE_TEXT.FULL}</EpisodeBadge>

            <MetaText icon={Clock} size="lg">
              {movie.time || UI_TEXT.NA}
            </MetaText>
            <MetaText icon={Calendar} size="lg">
              {movie.year || UI_TEXT.NA}
            </MetaText>
          </motion.div>

          {/* Quality & Language Badges */}
          <motion.div
            className="flex items-center flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <QualityBadge size="lg">{movie.quality || BADGE_TEXT.HD}</QualityBadge>

            <LangBadge size="lg">{movie.lang || BADGE_TEXT.SUBTITLE}</LangBadge>

            {movie.country?.map((c) => (
              <CountryBadge key={c.id} country={c} asLink size="lg" />
            ))}
          </motion.div>

          {/* Categories */}
          <motion.div
            className="flex items-center flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {movie.category?.map((c) => (
              <Link key={c.id} href={`/the-loai/${c.slug}`}>
                <span className="text-xs md:text-sm text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-all cursor-pointer inline-block">
                  {c.name}
                </span>
              </Link>
            ))}
          </motion.div>

          {/* Short Description */}
          <motion.div
            className="text-gray-400 leading-relaxed line-clamp-3 max-w-3xl text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(movie.content) }}
          />

          {/* External Links */}
          <motion.div
            className="flex items-center flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Watch Movie Button */}
            <button
              onClick={onWatchClick}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/80 transition-colors text-sm font-bold shadow-lg shadow-primary/30"
            >
              <Play className="w-4 h-4 fill-white" />
              {UI_TEXT.WATCH_NOW}
            </button>

            {movie.trailer_url && (
              <a
                href={movie.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
              >
                <Play className="w-4 h-4" />
                {UI_TEXT.WATCH_TRAILER}
              </a>
            )}
            {movie.tmdb?.id && (
              <a
                href={`https://www.themoviedb.org/${movie.tmdb.type || 'movie'}/${movie.tmdb.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#01b4e4]/20 text-[#01b4e4] border border-[#01b4e4]/30 px-4 py-2 rounded-lg hover:bg-[#01b4e4]/30 transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                TMDB
              </a>
            )}
            {movie.imdb?.id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#f5c518]/20 text-[#f5c518] border border-[#f5c518]/30 px-4 py-2 rounded-lg hover:bg-[#f5c518]/30 transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                IMDb
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
