import { EpisodeServerData } from '@/types'

export const getStreamUrl = (episode: EpisodeServerData) => {
  return episode.link_m3u8 || episode.link_embed
}
