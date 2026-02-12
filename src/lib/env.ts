import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_DOMAIN: z.string().url(),
  NEXT_PUBLIC_APP_DOMAIN_CDN_IMAGE: z.string().url(),
  NEXT_PUBLIC_TMDB_IMAGE_BASE: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000')
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
  NEXT_PUBLIC_APP_DOMAIN_CDN_IMAGE: process.env.NEXT_PUBLIC_APP_DOMAIN_CDN_IMAGE,
  NEXT_PUBLIC_TMDB_IMAGE_BASE: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
})
