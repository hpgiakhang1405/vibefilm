'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LIST_ITEMS, APP_ROUTES } from '@/lib/constants'
import { Genre, CountryList } from '@/types'
import { BrandLogo } from '@/components/ui/brand-logo'

interface DesktopNavProps {
  genres: Genre[]
  countries: CountryList[]
}

export function DesktopNav({ genres, countries }: DesktopNavProps) {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex items-center">
      <BrandLogo className="mr-20" iconClassName="h-7 w-7" textClassName="text-2xl" />
      <nav className="flex items-center space-x-2 text-sm font-medium">
        {/* List Dropdown - Hover triggered */}
        <div className="relative group/list px-2">
          <button
            className={cn(
              'flex items-center gap-1 py-2 rounded-full transition-all duration-300 hover:text-white',
              pathname?.includes(`${APP_ROUTES.LIST}/`) ? 'text-white font-bold' : 'text-gray-400'
            )}
          >
            Danh Mục
            <ChevronDown className="h-4 w-4 transition-transform group-hover/list:rotate-180" />
          </button>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/list:opacity-100 group-hover/list:visible transition-all duration-300 w-max z-50">
            <div className="w-200 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl grid grid-cols-4 gap-1 p-4 shadow-2xl">
              {NAV_LIST_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={`${APP_ROUTES.LIST}/${item.slug}`}
                  className="px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Genre Dropdown - Hover triggered */}
        <div className="relative group/genre px-2">
          <button
            className={cn(
              'flex items-center gap-1 py-2 rounded-full transition-all duration-300 hover:text-white',
              pathname?.includes(`${APP_ROUTES.GENRE}/`) ? 'text-white font-bold' : 'text-gray-400'
            )}
          >
            Thể Loại
            <ChevronDown className="h-4 w-4 transition-transform group-hover/genre:rotate-180" />
          </button>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/genre:opacity-100 group-hover/genre:visible transition-all duration-300 w-max z-50">
            <div className="w-200 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl grid grid-cols-5 gap-1 p-4 shadow-2xl">
              {genres.map((genre) => (
                <Link
                  key={genre.slug}
                  href={`${APP_ROUTES.GENRE}/${genre.slug}`}
                  className="px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary rounded-md transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Country Dropdown - Hover triggered */}
        <div className="relative group/country px-2">
          <button
            className={cn(
              'flex items-center gap-1 py-2 rounded-full transition-all duration-300 hover:text-white',
              pathname?.includes(`${APP_ROUTES.COUNTRY}/`) ? 'text-white font-bold' : 'text-gray-400'
            )}
          >
            Quốc Gia
            <ChevronDown className="h-4 w-4 transition-transform group-hover/country:rotate-180" />
          </button>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/country:opacity-100 group-hover/country:visible transition-all duration-300 w-max z-50">
            <div className="w-152 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-xl grid grid-cols-4 gap-1 p-4 shadow-2xl">
              {countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`${APP_ROUTES.COUNTRY}/${country.slug}`}
                  className="px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary rounded-md transition-colors"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
