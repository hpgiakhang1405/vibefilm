'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MovieDetail, Episode } from '@/types'

interface UseEpisodeManagerProps {
  movie: MovieDetail
}

interface UseEpisodeManagerReturn {
  currentServer: string | undefined
  currentEpisode: Episode | undefined
  shouldAutoPlay: boolean
  handleEpisodeChange: (serverName: string, episodeSlug: string) => void
  setShouldAutoPlay: (value: boolean) => void
}

export function useEpisodeManager({ movie }: UseEpisodeManagerProps): UseEpisodeManagerReturn {
  const router = useRouter()
  const searchParams = useSearchParams()
  const episodeParam = searchParams.get('episode')

  const findEpisodeBySlug = useCallback(
    (slug: string) => {
      if (!movie.episodes) return null
      for (const server of movie.episodes) {
        const found = server.server_data.find((ep) => ep.slug === slug)
        if (found) return { serverName: server.server_name, episode: found }
      }
      return null
    },
    [movie.episodes]
  )

  const resolvedEpisode = episodeParam ? findEpisodeBySlug(episodeParam) : null

  const currentServer = resolvedEpisode?.serverName ?? movie.episodes?.[0]?.server_name

  const currentEpisode: Episode | undefined = resolvedEpisode?.episode ?? movie.episodes?.[0]?.server_data?.[0]

  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)

  const handleEpisodeChange = useCallback(
    (serverName: string, episodeSlug: string) => {
      // Prevent re-click on same episode AND same server
      if (currentEpisode?.slug === episodeSlug && currentServer === serverName) return

      const server = movie.episodes.find((s) => s.server_name === serverName)
      const episode = server?.server_data.find((e) => e.slug === episodeSlug)

      if (episode) {
        setShouldAutoPlay(true)
        router.push(`/phim/${movie.slug}?episode=${episodeSlug}`, { scroll: false })
      }
    },
    [currentEpisode, currentServer, movie.episodes, movie.slug, router]
  )

  return {
    currentServer,
    currentEpisode,
    shouldAutoPlay,
    handleEpisodeChange,
    setShouldAutoPlay
  }
}
