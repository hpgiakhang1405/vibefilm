'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { SearchBar } from '@/features/search/components/search-bar'
import { Genre, CountryList } from '@/types'
import { MobileMenu } from './mobile-menu'
import { DesktopNav } from './desktop-nav'

interface HeaderProps {
  genres: Genre[]
  countries: CountryList[]
}

export function Header({ genres = [], countries = [] }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 will-change-transform transform-gpu',
        isScrolled
          ? 'bg-surface/95 backdrop-blur-lg shadow-lg shadow-black/20'
          : 'bg-transparent bg-linear-to-b from-black/70 to-transparent'
      )}
    >
      <div className="w-full container mx-auto flex h-20 items-center px-4 md:px-8">
        <MobileMenu genres={genres} countries={countries} />

        <DesktopNav genres={genres} countries={countries} />

        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:block">
            <SearchBar className="w-96 lg:w-120" />
          </div>
        </div>
      </div>
    </header>
  )
}
