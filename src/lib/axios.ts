import { env } from '@/lib/env'
import { CACHE_DURATION } from '@/lib/constants'

export const API_DOMAIN = env.NEXT_PUBLIC_API_DOMAIN
export const APP_DOMAIN_CDN_IMAGE = env.NEXT_PUBLIC_APP_DOMAIN_CDN_IMAGE
export const TMDB_IMAGE_BASE = env.NEXT_PUBLIC_TMDB_IMAGE_BASE

type FetchOptions = {
  params?: Record<string, string | number | boolean | undefined | null>
  revalidate?: number
  tags?: string[]
}

export const fetchData = async <T>(url: string, options?: FetchOptions): Promise<T | null> => {
  try {
    const { params, revalidate = CACHE_DURATION.DYNAMIC, tags } = options || {}
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined && value !== null) {
                acc[key] = String(value)
              }
              return acc
            },
            {} as Record<string, string>
          )
        ).toString()
      : ''

    const fullUrl = `${API_DOMAIN}${url}${queryString}`

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate,
        tags
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API Error: ${response.status} ${response.statusText} for URL: ${fullUrl}`)
    }

    return await response.json()
  } catch (error: unknown) {
    const err = error as Error & { message?: string }
    if (err.message?.includes('404')) {
      return null
    }
    // eslint-disable-next-line no-console
    console.error(`Fetch Error: ${url}`, error)
    throw error
  }
}
