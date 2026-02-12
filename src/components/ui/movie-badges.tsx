import { Badge } from '@/components/ui/badge'
import { Star, Globe, Clapperboard, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
  className?: string
  children: React.ReactNode
  size?: BadgeSize
  noIcon?: boolean
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] md:text-xs',
  md: 'px-2 py-0.5 text-xs md:text-sm',
  lg: 'px-3 py-1 text-sm md:text-base'
}

const iconSizes: Record<BadgeSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4'
}

/** Base styles to unify all badges */
const badgeBase =
  'inline-flex items-center gap-1.5 rounded-md border font-medium leading-none whitespace-nowrap select-none'

/** Use for shadcn Badge-based components */
const badgeShell = 'shadow-sm'

/** Use for div-based "badge" (RatingBadge / CountryBadge) */
const divShell = 'shadow-sm'

export function QualityBadge({ className, children, size = 'sm' }: BadgeProps) {
  return (
    <Badge
      variant="default"
      className={cn(
        badgeBase,
        badgeShell,
        'border-transparent bg-primary text-white font-bold',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Badge>
  )
}

export function EpisodeBadge({ className, children, size = 'sm', noIcon = false }: BadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        badgeBase,
        badgeShell,
        'border-transparent bg-black/70 text-white backdrop-blur-md',
        sizeClasses[size],
        className
      )}
    >
      {!noIcon && <Clapperboard className={iconSizes[size]} />}
      <span>{children}</span>
    </Badge>
  )
}

export function LangBadge({ className, children, size = 'sm', noIcon = false }: BadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        badgeBase,
        badgeShell,
        'bg-blue-500/20 text-blue-400 border-blue-500/30',
        sizeClasses[size],
        className
      )}
    >
      {!noIcon && <Languages className={iconSizes[size]} />}
      <span>{children}</span>
    </Badge>
  )
}

interface RatingProps {
  score: number
  count?: number
  className?: string
  showCount?: boolean
  size?: BadgeSize
  noIcon?: boolean
}

export function RatingBadge({ score, count, className, showCount = false, size = 'sm', noIcon = false }: RatingProps) {
  if (!score) return null

  return (
    <>
      <div
        className={cn(
          badgeBase,
          divShell,
          'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
          sizeClasses[size],
          className
        )}
      >
        {!noIcon && <Star className={cn(iconSizes[size], 'text-yellow-400 fill-yellow-400')} />}
        <span className="font-bold">{score.toFixed(1)}</span>
        {showCount && count && count > 0 && <span className="ml-0.5 opacity-80 text-yellow-500/60">({count})</span>}
      </div>

      <div className="h-4 w-px bg-white/20 mx-1"></div>
    </>
  )
}

interface MetaTextProps {
  icon?: React.ElementType
  children: React.ReactNode
  className?: string
  size?: BadgeSize
}

export function MetaText({ icon: Icon, children, className, size = 'sm' }: MetaTextProps) {
  const textSizes: Record<BadgeSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={cn('flex items-center gap-1.5 text-gray-300 font-medium', textSizes[size], className)}>
      {Icon && <Icon className={cn(iconSizes[size], 'text-gray-400')} />}
      <span>{children}</span>
    </div>
  )
}

interface CountryBadgeProps {
  country: { name: string; slug: string }
  className?: string
  asLink?: boolean
  size?: BadgeSize
  noIcon?: boolean
}

export function CountryBadge({ country, className, asLink = false, size = 'sm', noIcon = false }: CountryBadgeProps) {
  const content = (
    <div
      className={cn(
        badgeBase,
        divShell,
        'bg-green-500/20 border-green-500/30 text-green-400',
        sizeClasses[size],
        className
      )}
    >
      {!noIcon && <Globe className={iconSizes[size]} />}
      <span>{country.name}</span>
    </div>
  )

  if (asLink) {
    return <Link href={`/quoc-gia/${country.slug}`}>{content}</Link>
  }

  return content
}
