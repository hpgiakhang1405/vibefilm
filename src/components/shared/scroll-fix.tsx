'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollFix() {
  const pathname = usePathname()

  useEffect(() => {
    // Disable browser's default scroll restoration to avoid interference
    if (typeof window !== 'undefined' && window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Use requestAnimationFrame to ensure the scroll happens right after the DOM update
    // minimizing the "flash" of the previous scroll position
    const handleScroll = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        })
      } catch {
        // Fallback for older browsers
        window.scrollTo(0, 0)
      }
    }

    // Execute immediately and also in the next frame to catch any layout shifts
    handleScroll()
    const rafId = requestAnimationFrame(handleScroll)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [pathname])

  return null
}
