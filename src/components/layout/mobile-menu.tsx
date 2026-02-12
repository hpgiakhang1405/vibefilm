'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/ui/brand-logo'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { SearchBar } from '@/features/search/components/search-bar'
import { NAV_LIST_ITEMS, APP_ROUTES } from '@/lib/constants'
import { Genre, CountryList } from '@/types'

interface MobileMenuProps {
  genres: Genre[]
  countries: CountryList[]
}

export function MobileMenu({ genres, countries }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden text-white"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="pr-0 bg-surface/98 backdrop-blur-xl border-r border-white/10 overflow-y-auto"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Mobile Navigation Menu</SheetDescription>
          <nav className="flex flex-col gap-1 p-4 mt-10">
            <div className="mb-4">
              <SearchBar disableDropdown={true} className="w-full" onSearch={closeMenu} />
            </div>
            <div className="px-4 py-2 text-sm font-bold text-gray-500 uppercase mt-4">Danh Sách</div>
            <div className="grid grid-cols-2 gap-1">
              {NAV_LIST_ITEMS.map((item) => (
                <Link
                  key={item.slug}
                  href={`${APP_ROUTES.LIST}/${item.slug}`}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-base font-medium transition-all hover:text-primary hover:bg-white/5 rounded-md text-foreground/60"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="px-4 py-2 text-sm font-bold text-gray-500 uppercase mt-4">Thể loại</div>
            <div className="grid grid-cols-2 gap-1">
              {genres.map((genre) => (
                <Link
                  key={genre.slug}
                  href={`${APP_ROUTES.GENRE}/${genre.slug}`}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-base font-medium transition-all hover:text-primary hover:bg-white/5 rounded-md text-foreground/60"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <div className="px-4 py-2 text-sm font-bold text-gray-500 uppercase mt-4">Quốc gia</div>
            <div className="grid grid-cols-2 gap-1">
              {countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`${APP_ROUTES.COUNTRY}/${country.slug}`}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-base font-medium transition-all hover:text-primary hover:bg-white/5 rounded-md text-foreground/60"
                >
                  {country.name}
                </Link>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Mobile Logo */}
      <BrandLogo className="md:hidden" onClick={closeMenu} />
    </>
  )
}
