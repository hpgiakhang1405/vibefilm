import { ListResponse } from '@/types'
import { API_ENDPOINTS, CACHE_TAGS } from '@/lib/constants'
import { fetchData } from '@/lib/axios'

export const searchMovies = async (keyword: string, page: number = 1): Promise<ListResponse | null> => {
  return fetchData<ListResponse>(API_ENDPOINTS.SEARCH, {
    params: { keyword, page },
    revalidate: 0,
    tags: [CACHE_TAGS.SEARCH]
  })
}
