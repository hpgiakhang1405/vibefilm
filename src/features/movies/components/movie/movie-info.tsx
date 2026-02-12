'use client'

import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { CastCrewCard } from '@/features/movies/components/movie/cast-crew-card'
import { KeywordsCard } from './keywords-card'
import { Keyword, MovieDetail } from '@/types'
import DOMPurify from 'isomorphic-dompurify'

interface MovieInfoProps {
  movie: MovieDetail
  keywords?: Keyword[]
}

export function MovieInfo({ movie, keywords }: MovieInfoProps) {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Content Panel */}
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center">
              <Info className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            Nội dung phim
          </h3>
          <Separator className="mb-5 bg-white/10" />
          <div
            className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(movie.content) }}
          />
        </div>
      </motion.div>

      {/* Side Panels */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Cast & Crew Card */}
        <CastCrewCard movieSlug={movie.slug} actors={movie.actor} directors={movie.director} />

        {/* Keywords Card */}
        <KeywordsCard keywords={keywords} />
      </motion.div>
    </div>
  )
}
