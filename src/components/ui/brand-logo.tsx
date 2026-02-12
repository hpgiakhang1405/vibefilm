'use client'

import Link from 'next/link'
import { Film } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  iconClassName?: string
  textClassName?: string
  onClick?: () => void
}

export function BrandLogo({ className, iconClassName, textClassName, onClick }: BrandLogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 group', className)} onClick={onClick}>
      <Film
        className={cn('h-6 w-6 text-primary group-hover:rotate-12 transition-transform duration-300', iconClassName)}
      />
      <span
        className={cn(
          'font-black text-xl tracking-tight bg-linear-to-r from-primary via-red-500 to-orange-400 bg-clip-text text-transparent',
          textClassName
        )}
      >
        VibeFilm
      </span>
    </Link>
  )
}
