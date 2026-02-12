import Link from 'next/link'
import { BrandLogo } from '@/components/ui/brand-logo'
import { Genre, CountryList } from '@/types'
import { APP_ROUTES, MOVIE_TYPES, UI_TEXT, EXTERNAL_LINKS } from '@/lib/constants'

interface FooterProps {
  genres: Genre[]
  countries: CountryList[]
}

export function Footer({ genres, countries }: FooterProps) {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]">
      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -top-52 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      <div className="w-full container mx-auto px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <BrandLogo className="mb-4" iconClassName="h-8 w-8" />
            <p className="text-sm text-gray-500 leading-relaxed">{UI_TEXT.ABOUT_TITLE}</p>
            <p className="text-sm text-gray-500 leading-relaxed mt-2">{UI_TEXT.ABOUT_DESC}</p>
          </div>

          {/* Quick Links */}
          <div className="hidden md:block">
            <h4 className="text-white font-bold mb-4">{UI_TEXT.CATEGORY}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href={`${APP_ROUTES.LIST}/${MOVIE_TYPES.PHIM_LE}`}
                  className="hover:text-primary transition-colors"
                >
                  Phim Lẻ
                </Link>
              </li>
              <li>
                <Link
                  href={`${APP_ROUTES.LIST}/${MOVIE_TYPES.PHIM_BO}`}
                  className="hover:text-primary transition-colors"
                >
                  Phim Bộ
                </Link>
              </li>
              <li>
                <Link
                  href={`${APP_ROUTES.LIST}/${MOVIE_TYPES.HOAT_HINH}`}
                  className="hover:text-primary transition-colors"
                >
                  Hoạt Hình
                </Link>
              </li>
              <li>
                <Link
                  href={`${APP_ROUTES.LIST}/${MOVIE_TYPES.TV_SHOWS}`}
                  className="hover:text-primary transition-colors"
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div className="hidden md:block">
            <h4 className="text-white font-bold mb-4">{UI_TEXT.GENRE}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {genres.slice(0, 5).map((genre) => (
                <li key={genre.slug}>
                  <Link href={`${APP_ROUTES.GENRE}/${genre.slug}`} className="hover:text-primary transition-colors">
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="hidden md:block">
            <h4 className="text-white font-bold mb-4">{UI_TEXT.COUNTRY}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {countries.slice(0, 5).map((country) => (
                <li key={country.slug}>
                  <Link href={`${APP_ROUTES.COUNTRY}/${country.slug}`} className="hover:text-primary transition-colors">
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            {UI_TEXT.COPYRIGHT}{' '}
            <a href={EXTERNAL_LINKS.OPHIM} target="_blank" className="text-primary hover:underline font-medium">
              OPhim API
            </a>
          </p>
          <p>
            {UI_TEXT.MADE_BY}{' '}
            <a href={EXTERNAL_LINKS.AUTHOR} target="_blank" className="text-primary hover:underline font-medium">
              Antigravity
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
