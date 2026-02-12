import {
  ListResponse,
  MovieDetailResponse,
  PeoplesResponse,
  CategoryListResponse,
  Genre,
  CountryList,
  KeywordsResponse,
  ImagesResponse
} from '@/types'
import { API_ENDPOINTS, CACHE_DURATION, CACHE_TAGS } from '@/lib/constants'
import { fetchData } from '@/lib/axios'

export const getListMovies = async (type: string, page: number = 1): Promise<ListResponse | null> => {
  return fetchData<ListResponse>(`${API_ENDPOINTS.LIST}/${type}`, {
    params: { page },
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.LIST, `${CACHE_TAGS.LIST}:${type}`, `${CACHE_TAGS.LIST}:${type}:page:${page}`]
  })
}

export const getMoviesByCategory = async (categorySlug: string, page: number = 1): Promise<ListResponse | null> => {
  return fetchData<ListResponse>(`${API_ENDPOINTS.GENRE}/${categorySlug}`, {
    params: { page },
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.GENRE, `${CACHE_TAGS.GENRE}:${categorySlug}`, `${CACHE_TAGS.GENRE}:${categorySlug}:page:${page}`]
  })
}

export const getMoviesByCountry = async (countrySlug: string, page: number = 1): Promise<ListResponse | null> => {
  return fetchData<ListResponse>(`${API_ENDPOINTS.COUNTRY}/${countrySlug}`, {
    params: { page },
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [
      CACHE_TAGS.COUNTRY,
      `${CACHE_TAGS.COUNTRY}:${countrySlug}`,
      `${CACHE_TAGS.COUNTRY}:${countrySlug}:page:${page}`
    ]
  })
}

export const getMovieDetail = async (slug: string): Promise<MovieDetailResponse | null> => {
  return fetchData<MovieDetailResponse>(`${API_ENDPOINTS.MOVIE_DETAIL}/${slug}`, {
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.MOVIE, `${CACHE_TAGS.MOVIE}:${slug}`]
  })
}

export const getMoviePeoples = async (slug: string): Promise<PeoplesResponse | null> => {
  return fetchData<PeoplesResponse>(`${API_ENDPOINTS.MOVIE_DETAIL}/${slug}${API_ENDPOINTS.PEOPLES}`, {
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.MOVIE_PEOPLES, `${CACHE_TAGS.MOVIE_PEOPLES}:${slug}`]
  })
}

export const getMovieKeywords = async (slug: string): Promise<KeywordsResponse | null> => {
  return fetchData<KeywordsResponse>(`${API_ENDPOINTS.MOVIE_DETAIL}/${slug}${API_ENDPOINTS.KEYWORDS}`, {
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.MOVIE_KEYWORDS, `${CACHE_TAGS.MOVIE_KEYWORDS}:${slug}`]
  })
}

export const getMovieImages = async (slug: string): Promise<ImagesResponse | null> => {
  return fetchData<ImagesResponse>(`${API_ENDPOINTS.MOVIE_DETAIL}/${slug}${API_ENDPOINTS.IMAGES}`, {
    revalidate: CACHE_DURATION.DYNAMIC,
    tags: [CACHE_TAGS.MOVIE_IMAGES, `${CACHE_TAGS.MOVIE_IMAGES}:${slug}`]
  })
}

// These are shared/global but fit here for now
export const getGenres = async (): Promise<Genre[]> => {
  const data = await fetchData<CategoryListResponse<Genre>>(API_ENDPOINTS.GENRE, {
    revalidate: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.GENRE]
  })
  return data?.data?.items || []
}

export const getCountries = async (): Promise<CountryList[]> => {
  const data = await fetchData<CategoryListResponse<CountryList>>(API_ENDPOINTS.COUNTRY, {
    revalidate: CACHE_DURATION.STATIC,
    tags: [CACHE_TAGS.COUNTRY]
  })
  return data?.data?.items || []
}
