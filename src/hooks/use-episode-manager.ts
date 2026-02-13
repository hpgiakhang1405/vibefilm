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
  const serverParam = searchParams.get('server')
  const episodeParam = searchParams.get('episode')

  const findEpisodeBySlug = useCallback(
    (slug: string, serverName?: string | null) => {
      if (!movie.episodes) return null

      // If server specified, try to find in that server first
      if (serverName) {
        const server = movie.episodes.find((s) => s.server_name === serverName)
        if (server) {
          const found = server.server_data.find((ep) => ep.slug === slug)
          if (found) return { serverName: server.server_name, episode: found }
        }
      }

      // Fallback to searching all servers (existing logic)
      for (const server of movie.episodes) {
        const found = server.server_data.find((ep) => ep.slug === slug)
        if (found) return { serverName: server.server_name, episode: found }
      }
      return null
    },
    [movie.episodes]
  )

  const resolvedEpisode = episodeParam ? findEpisodeBySlug(episodeParam, serverParam) : null

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
        const params = new URLSearchParams()
        params.set('episode', episodeSlug)
        params.set('server', serverName)
        router.push(`/phim/${movie.slug}?${params.toString()}`, { scroll: false })
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
