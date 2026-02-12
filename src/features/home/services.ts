import { API_ENDPOINTS, CACHE_DURATION, CACHE_TAGS } from '@/lib/constants'
import { fetchData } from '@/lib/axios'

export const getHomeData = async () => {
  return fetchData<unknown>(API_ENDPOINTS.HOME, {
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.HOME]
  })
}
