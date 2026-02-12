import { getListMovies } from '@/features/movies/services'
import { HeroSection } from '@/features/home/components/hero-section'
import { MovieSection } from '@/features/movies/components/movie-section'
import { MOVIE_TYPES, APP_ROUTES, DOM_IDS } from '@/lib/constants'

export const revalidate = 3600

export default async function Home() {
  const safeFetch = <T,>(promise: Promise<T>): Promise<T | null> => promise.catch(() => null)

  const [phimChieuRap, phimBoDangChieu, phimLe, phimBo, hoatHinh, tvShows] = await Promise.all([
    safeFetch(getListMovies(MOVIE_TYPES.PHIM_CHIEU_RAP)),
    safeFetch(getListMovies(MOVIE_TYPES.PHIM_BO_DANG_CHIEU)),
    safeFetch(getListMovies(MOVIE_TYPES.PHIM_LE)),
    safeFetch(getListMovies(MOVIE_TYPES.PHIM_BO)),
    safeFetch(getListMovies(MOVIE_TYPES.HOAT_HINH)),
    safeFetch(getListMovies(MOVIE_TYPES.TV_SHOWS))
  ])

  const heroMovies = [
    ...(phimChieuRap?.data?.items?.slice(0, 5) || []),
    ...(phimBoDangChieu?.data?.items?.slice(0, 5) || [])
  ]

  return (
    <div className="space-y-8 pb-8">
      <HeroSection movies={heroMovies} />

      <div className="space-y-12 py-10 relative z-10">
        {phimLe?.data?.items && (
          <MovieSection
            id={`${DOM_IDS.MOVIE_SECTION_BASE}-0`}
            title="Phim Lẻ"
            movies={phimLe.data.items}
            link={`${APP_ROUTES.LIST}/${MOVIE_TYPES.PHIM_LE}`}
            index={0}
          />
        )}
        {phimBo?.data?.items && (
          <MovieSection
            title="Phim Bộ"
            movies={phimBo.data.items}
            link={`${APP_ROUTES.LIST}/${MOVIE_TYPES.PHIM_BO}`}
            index={1}
          />
        )}
        {hoatHinh?.data?.items && (
          <MovieSection
            title="Hoạt Hình"
            movies={hoatHinh.data.items}
            link={`${APP_ROUTES.LIST}/${MOVIE_TYPES.HOAT_HINH}`}
            index={2}
          />
        )}
        {tvShows?.data?.items && (
          <MovieSection
            title="TV Shows"
            movies={tvShows.data.items}
            link={`${APP_ROUTES.LIST}/${MOVIE_TYPES.TV_SHOWS}`}
            index={3}
          />
        )}
      </div>
    </div>
  )
}
