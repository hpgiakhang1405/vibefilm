'use client'

import { useMemo, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { ImageOff } from 'lucide-react'

interface ImageWithFallbackProps extends ImageProps {
  fallback?: React.ReactNode
}

const getSourceKey = (src: ImageProps['src']): string => {
  if (!src) return ''
  if (typeof src === 'string') return src
  if (typeof src === 'object' && 'src' in src && typeof src.src === 'string') {
    return src.src
  }
  return ''
}

export function ImageWithFallback({ src, alt, fallback, className, ...props }: ImageWithFallbackProps) {
  const sourceKey = useMemo(() => getSourceKey(src), [src])
  const [erroredSourceKey, setErroredSourceKey] = useState<string | null>(null)
  const [loadedSourceKey, setLoadedSourceKey] = useState<string | null>(null)

  const hasError = !sourceKey || erroredSourceKey === sourceKey
  const isLoading = !!sourceKey && loadedSourceKey !== sourceKey

  if (hasError || !src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-500 h-full',
          className
        )}
      >
        {fallback || (
          <div className="flex flex-col items-center gap-2 p-2 text-center">
            <ImageOff className="w-8 h-8 opacity-50" />
            <span className="text-xs font-medium opacity-50">Không có ảnh</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn(className, 'transition-all duration-500', isLoading ? 'opacity-0' : 'opacity-100')}
      onError={() => {
        setErroredSourceKey(sourceKey)
      }}
      onLoad={() => {
        setLoadedSourceKey(sourceKey)
      }}
      {...props}
    />
  )
}
