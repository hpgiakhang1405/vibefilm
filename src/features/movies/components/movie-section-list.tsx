import { Movie, Pagination as PaginationType } from '@/types'
import { MovieCard } from '@/features/movies/components/movie-card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface MovieListPageProps {
  title: string
  movies: Movie[]
  pagination: PaginationType
  baseUrl: string
}

export function MovieListPage({ title, movies, pagination, baseUrl }: MovieListPageProps) {
  const { currentPage, totalItemsPerPage, totalItems } = pagination
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  const getPageUrl = (page: number) => {
    // Check if baseUrl already has query params
    if (baseUrl.includes('?')) {
      return `${baseUrl}&page=${page}`
    }
    return `${baseUrl}?page=${page}`
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
      endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            href={getPageUrl(1)}
            className="bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-white"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis className="text-gray-500" />
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={getPageUrl(i)}
            isActive={i === currentPage}
            className={
              i !== currentPage
                ? 'bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-white'
                : ''
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis className="text-gray-500" />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            href={getPageUrl(totalPages)}
            className="bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-white"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Cinematic Header */}
      <div className="relative mb-8 px-4 md:px-12">
        <div className="absolute -top-20 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">{title}</h1>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-gray-400 text-lg">
            Tổng cộng <span className="text-primary font-bold">{totalItems.toLocaleString()}</span> phim
          </p>
          {/* Page Info */}
          <p className="text-sm text-gray-500">
            Trang <span className="text-white font-medium">{currentPage}</span> / {totalPages}
          </p>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="px-4 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-12">
        {movies.map((movie, index) => (
          <div
            key={movie._id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            <MovieCard movie={movie} index={index} priority={index < 6} />
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="px-4 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <Pagination>
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
                    aria-disabled={currentPage <= 1}
                    className={`${currentPage <= 1 ? 'pointer-events-none opacity-30' : 'bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-white'}`}
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
                    aria-disabled={currentPage >= totalPages}
                    className={`${currentPage >= totalPages ? 'pointer-events-none opacity-30' : 'bg-white/5 border-white/10 hover:bg-primary hover:border-primary hover:text-white'}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  )
}
