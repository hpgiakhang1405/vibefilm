'use client'

import { useEffect, startTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { ErrorDisplay } from '@/components/ui/error-display'
import { ERROR_ICON_CLASS } from '@/lib/constants'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    // Optionally log to error reporting service (e.g., Sentry) in production
    // errorReportingService.captureException(error)
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  const handleReset = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <ErrorDisplay
        code="Error"
        title="Có chút trục trặc nhỏ"
        description="Hệ thống đang gặp vấn đề tạm thời. Bạn thử tải lại trang xem sao nhé!"
        icon={<AlertTriangle className={ERROR_ICON_CLASS} />}
        action={
          <div className="flex gap-4">
            <Button
              onClick={handleReset}
              size="lg"
              className="h-12 px-8 text-base font-bold bg-white text-black hover:bg-white/90 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Thử lại ngay
            </Button>
            <Button
              variant="secondary"
              asChild
              size="lg"
              className="h-12 px-8 text-base font-bold text-white hover:bg-white/10 rounded-lg transition-all duration-300 gap-2"
            >
              <Link href="/">
                <Home className="w-5 h-5" />
                Về trang chủ
              </Link>
            </Button>
          </div>
        }
      />
    </div>
  )
}
