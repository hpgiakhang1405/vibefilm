'use client'

import { useState } from 'react'
import { EpisodeServer } from '@/types'
import { Server, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UI_TEXT } from '@/lib/constants'

interface EpisodeListProps {
  episodes: EpisodeServer[]
  currentEpisodeSlug: string
  currentServerName?: string
  onChangeEpisode: (serverName: string, episodeSlug: string) => void
}

export function EpisodeList({ episodes, currentEpisodeSlug, currentServerName, onChangeEpisode }: EpisodeListProps) {
  const getInitialServer = () => {
    if (currentServerName) return currentServerName
    return (
      episodes.find((s) => s.server_data.some((ep) => ep.slug === currentEpisodeSlug))?.server_name ||
      episodes[0]?.server_name ||
      ''
    )
  }

  const [selectedServer, setSelectedServer] = useState(getInitialServer)
  const activeServer = currentServerName || selectedServer
  const currentServerData = episodes.find((s) => s.server_name === activeServer)

  const handleServerChange = (serverName: string) => {
    setSelectedServer(serverName)
    const newServer = episodes.find((s) => s.server_name === serverName)
    if (newServer && newServer.server_data.length > 0) {
      // Try to find the same episode slug in the new server
      const sameEpisode = newServer.server_data.find((ep) => ep.slug === currentEpisodeSlug)
      if (sameEpisode) {
        onChangeEpisode(serverName, sameEpisode.slug)
      } else {
        // Otherwise, find by index or default to first
        const currentServer = episodes.find((s) => s.server_data.some((ep) => ep.slug === currentEpisodeSlug))
        const currentIndex = currentServer?.server_data.findIndex((ep) => ep.slug === currentEpisodeSlug) ?? 0
        const targetEpisode = newServer.server_data[currentIndex] || newServer.server_data[0]
        onChangeEpisode(serverName, targetEpisode.slug)
      }
    }
  }

  if (!episodes || episodes.length === 0) {
    return null
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10">
      {/* Server Selection - only show if multiple servers */}
      {episodes.length > 1 && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-green-500/20 flex items-center justify-center">
              <Server className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-white">{UI_TEXT.CHOOSE_SERVER}</h4>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {episodes.map((server) => (
              <Button
                key={server.server_name}
                onClick={() => handleServerChange(server.server_name)}
                variant={activeServer === server.server_name ? 'default' : 'secondary'}
                className={
                  activeServer === server.server_name
                    ? 'shadow-lg shadow-primary/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white'
                }
              >
                {server.server_name}
              </Button>
            ))}
          </div>
          <div className="h-px bg-white/10 mb-6" />
        </>
      )}

      {/* Episode List */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center">
          <Play className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        <h4 className="text-lg md:text-xl font-bold text-white">{UI_TEXT.EPISODE_LIST}</h4>
        <span className="text-xs md:text-sm text-gray-500 ml-1">
          ({currentServerData?.server_data.length || 0} {UI_TEXT.EPISODE})
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {currentServerData?.server_data.map((episode) => (
          <Button
            key={episode.slug}
            onClick={() => onChangeEpisode(activeServer, episode.slug)}
            size="sm"
            variant={currentEpisodeSlug === episode.slug ? 'default' : 'ghost'}
            className={`w-full ${
              currentEpisodeSlug === episode.slug
                ? 'shadow-lg shadow-primary/30'
                : 'bg-white/5 text-gray-300 hover:bg-primary/20 hover:text-white border border-white/10'
            }`}
            title={episode.name}
          >
            {episode.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
