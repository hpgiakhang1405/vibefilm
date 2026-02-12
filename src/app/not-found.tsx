'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Film } from 'lucide-react'
import { ErrorDisplay } from '@/components/ui/error-display'
import { ERROR_ICON_CLASS } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ErrorDisplay
        code="404"
        title="Opps! Trang này không tồn tại"
        description="Có vẻ như đường dẫn này bị hỏng hoặc trang đã bị xóa. Đừng lo, hãy quay về trang chủ để xem phim nhé!"
        icon={<Film className={ERROR_ICON_CLASS} />}
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
