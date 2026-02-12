import { getMovieDetail, getMovieKeywords, getMovieImages } from '@/features/movies/services'
import { MovieDetailClient } from '@/features/movies/components/movie-detail'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ episode?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getMovieDetail(slug)
  const movie = data?.data?.item

  if (!movie) {
    return {
      title: 'Không tìm thấy phim'
    }
  }

  return {
    title: `${movie.name} - ${movie.origin_name} | VibeFilm`,
    description: movie.content.substring(0, 160) + '...',
    openGraph: {
      images: [movie.poster_url]
    }
  }
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { slug } = await params

  const [movieData, keywordsData, imagesData] = await Promise.all([
    getMovieDetail(slug),
    getMovieKeywords(slug),
    getMovieImages(slug)
  ])

  if (!movieData?.status || !movieData?.data?.item) {
    notFound()
  }

  const keywords = keywordsData?.data?.keywords || []
  const images = imagesData?.data?.images || []

  return <MovieDetailClient movie={movieData.data.item} keywords={keywords} images={images} />
}
