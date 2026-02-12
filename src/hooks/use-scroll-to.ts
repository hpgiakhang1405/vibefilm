'use client'

import { useCallback } from 'react'

interface ScrollToOptions {
  offset?: number
  behavior?: ScrollBehavior
}

export function useScrollTo() {
  const scrollToId = useCallback((id: string, options?: ScrollToOptions) => {
    const { offset = 0, behavior = 'smooth' } = options || {}
    const element = document.getElementById(id)

    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + offset
      window.scrollTo({ top: y, behavior })
      return true
    }
    return false
  }, [])

  const scrollToTop = useCallback((behavior: ScrollBehavior = 'smooth') => {
    window.scrollTo({ top: 0, behavior })
  }, [])

  return { scrollToId, scrollToTop }
}
