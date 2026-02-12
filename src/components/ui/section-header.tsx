'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  link?: string
  className?: string
}

export function SectionHeader({ title, link, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {link ? (
        <Link href={link} className="group/title flex items-center">
          <div className="flex items-center gap-3">
            {/* Vertical Bar Indicator - Animate in from zero height or opacity */}
            <div className="w-1 h-6 md:h-7 bg-primary rounded-full opacity-0 scale-y-0 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:scale-y-100 origin-center" />

            <div className="flex items-center gap-2 transition-transform duration-300 group-hover/title:translate-x-1">
              <h2 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover/title:text-primary">
                {title}
              </h2>
              <div className="flex items-center text-sm font-semibold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0">
                Xem tất cả <ChevronRight className="ml-0.5 h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      )}
    </div>
  )
}
