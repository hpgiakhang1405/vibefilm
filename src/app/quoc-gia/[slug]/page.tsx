import { getMoviesByCountry } from '@/features/movies/services'
import { MovieListPage } from '@/features/movies/components/movie-section-list'
import { APP_ROUTES } from '@/lib/constants'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function CountryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const parsedPage = Number.parseInt(pageParam || '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const data = await getMoviesByCountry(slug, page)

  if (!data?.data?.items) {
    notFound()
  }

  return (
    <MovieListPage
      title={data.data.titlePage}
      movies={data.data.items}
      pagination={data.data.params.pagination}
      baseUrl={`${APP_ROUTES.COUNTRY}/${slug}`}
    />
  )
}
