'use client'

import { useState } from 'react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { motion } from 'framer-motion'
import { User, Users, Loader2, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Actor } from '@/types'
import { getMoviePeoples } from '@/features/movies/services'
import { TMDB_IMAGE_BASE } from '@/lib/axios'

interface CastCrewCardProps {
  movieSlug: string
  actors?: string[]
  directors?: string[]
}

export function CastCrewCard({ movieSlug, actors, directors }: CastCrewCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [peopleData, setPeopleData] = useState<Actor[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchActors = async () => {
    if (hasFetched) return
    setIsLoading(true)
    try {
      const data = await getMoviePeoples(movieSlug)
      if (data?.data?.peoples) {
        setPeopleData(data.data.peoples)
      }
    } catch {
      // Actor fetch failed silently
    } finally {
      setIsLoading(false)
      setHasFetched(true)
    }
  }

  const getActorImage = (actor: Actor, size: string = 'w185') => {
    if (actor.profile_path) {
      return `${TMDB_IMAGE_BASE}/${size}${actor.profile_path}`
    }
    return null
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10">
      {/* Directors Section */}
      <div className="mb-4">
        <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-500/20 flex items-center justify-center">
            <User className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
          </div>
          Đạo diễn
        </h4>
        <div className="flex flex-wrap gap-2">
          {directors && directors.length > 0 ? (
            directors.map((director, idx) => (
              <span
                key={idx}
                className="text-sm text-gray-300 bg-black/30 px-3 py-1.5 rounded-full border border-white/5"
              >
                {director}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">Đang cập nhật</span>
          )}
        </div>
      </div>

      <Separator className="bg-white/10 mb-4" />

      {/* Actors Section */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (open) fetchActors()
        }}
      >
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              Diễn viên
              <span className="ml-auto text-xs text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1 font-medium">
                Xem tất cả
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {actors?.slice(0, 5).map((actor, idx) => (
                <span
                  key={idx}
                  className="text-sm text-gray-300 bg-black/30 px-3 py-1.5 rounded-full border border-white/5"
                >
                  {actor}
                </span>
              )) || <span className="text-gray-500">Đang cập nhật</span>}
              {(actors?.length || 0) > 5 && (
                <span className="text-sm text-primary flex items-center font-medium">+{actors!.length - 5}</span>
              )}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[95vw]! max-w-2xl! max-h-[85vh] overflow-y-auto bg-[#1a1a1a]/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              Dàn diễn viên ({peopleData.length || actors?.length || 0})
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="ml-3 text-gray-400">Đang tải thông tin diễn viên...</span>
            </div>
          ) : peopleData.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-10 gap-y-8 mt-6 px-2">
              {peopleData.map((actor, idx) => {
                const imageUrl = getActorImage(actor)
                return (
                  <motion.div
                    key={actor.tmdb_people_id || idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-linear-to-br from-blue-500/20 to-purple-500/20 mb-2 ring-2 ring-white/10 group-hover:ring-primary/50 transition-all group-hover:scale-105">
                      {imageUrl ? (
                        <ImageWithFallback
                          src={imageUrl}
                          alt={actor.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          quality={60}
                          fallback={
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/40 bg-white/5">
                              {actor.name.charAt(0).toUpperCase()}
                            </div>
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white/40">
                          {actor.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center text-gray-300 font-medium leading-tight group-hover:text-white transition-colors">
                      {actor.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          ) : actors?.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {actors.map((actor, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-linear-to-br from-blue-500/20 to-purple-500/20 mb-3">
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/30">
                      {actor.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <span className="text-sm text-center text-gray-200 font-medium line-clamp-2">{actor}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">Đang cập nhật thông tin diễn viên</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
