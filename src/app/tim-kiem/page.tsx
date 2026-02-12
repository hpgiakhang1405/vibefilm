import Link from 'next/link'
import { searchMovies } from '@/features/search/services'
import { MovieListPage } from '@/features/movies/components/movie-section-list'
import { Button } from '@/components/ui/button'
import { Search, Home } from 'lucide-react'
import { ErrorDisplay } from '@/components/ui/error-display'
import { ERROR_ICON_CLASS } from '@/lib/constants'
import { SearchBar } from '@/features/search/components/search-bar'

interface PageProps {
  searchParams: Promise<{ keyword?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { keyword: keywordParam, page: pageParam } = await searchParams
  const rawKeyword = (keywordParam || '').replace(/[\u0000-\u001F\u007F]/g, '').trim()

  // Security: Limit keyword length to prevent DOS/abuse
  const keyword = rawKeyword.length > 100 ? rawKeyword.slice(0, 100) : rawKeyword

  const parsedPage = Number.parseInt(pageParam || '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  if (!keyword) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <div className="px-4 w-full md:hidden z-20">
          <SearchBar />
        </div>

        <ErrorDisplay
          title="Bạn muốn tìm phim gì?"
          description="Hãy nhập tên phim, diễn viên hoặc đạo diễn vào ô tìm kiếm phía trên nhé."
          icon={<Search className={ERROR_ICON_CLASS} />}
        />
      </div>
    )
  }

  const data = await searchMovies(keyword, page)

  if (!data?.data?.items || data.data.items.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorDisplay
          title={`Không tìm thấy "${keyword}"`}
          description="Tiếc quá, kho phim chưa có nội dung này. Bạn thử tìm từ khóa khác xem sao?"
          icon={<Search className={ERROR_ICON_CLASS} />}
          action={
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-bold bg-white text-black hover:bg-white/90 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Về Trang Chủ
              </Link>
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <MovieListPage
      title={`Kết quả tìm kiếm cho "${keyword}"`}
      movies={data.data.items}
      pagination={data.data.params.pagination}
      baseUrl={`/tim-kiem?keyword=${encodeURIComponent(keyword)}`}
    />
  )
}
