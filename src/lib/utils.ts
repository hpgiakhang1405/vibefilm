import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { APP_DOMAIN_CDN_IMAGE } from '@/lib/axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function getMovieImageUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${APP_DOMAIN_CDN_IMAGE}/${path}`
}
