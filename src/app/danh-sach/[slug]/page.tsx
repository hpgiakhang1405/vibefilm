import { getListMovies } from '@/features/movies/services'
import { MovieListPage } from '@/features/movies/components/movie-section-list'
import { APP_ROUTES, NAV_LIST_ITEMS } from '@/lib/constants'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return NAV_LIST_ITEMS.map((item) => ({
    slug: item.slug
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function ListPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const parsedPage = Number.parseInt(pageParam || '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const data = await getListMovies(slug, page)

  if (!data?.data?.items) {
    notFound()
  }

  return (
    <MovieListPage
      title={data.data.titlePage}
      movies={data.data.items}
      pagination={data.data.params.pagination}
      baseUrl={`${APP_ROUTES.LIST}/${slug}`}
    />
  )
}
