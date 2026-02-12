'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { searchMovies } from '@/features/search/services'
import { Movie } from '@/types'
import { cn } from '@/lib/utils'
import { SearchResults } from './search-results'
import { UI_TEXT, TIMING, APP_ROUTES } from '@/lib/constants'

interface SearchBarProps {
  className?: string
  disableDropdown?: boolean
  onSearch?: () => void
}

export function SearchBar({ className, disableDropdown = false, onSearch }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<Movie[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(query, TIMING.DEBOUNCE_SEARCH)

  // Search Effect
  React.useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([])
        setIsOpen(false)
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)
      try {
        const data = await searchMovies(debouncedQuery)
        if (data?.status && data.data?.items) {
          setResults(data.data.items.slice(0, 5)) // Limit to 5 results
          setIsOpen(true)
        } else {
          setResults([])
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        setError('Có lỗi xảy ra khi tìm kiếm')
        setResults([])
        setIsOpen(true) // Open dropdown to show error
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  // Click Outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`${APP_ROUTES.SEARCH}?keyword=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
      inputRef.current?.blur()
      onSearch?.()
    }
  }

  const handleResultClick = (slug: string) => {
    setIsOpen(false)
    router.push(`${APP_ROUTES.MOVIE}/${slug}`)
    onSearch?.()
  }

  const handleViewAll = () => {
    if (query.trim()) {
      router.push(`${APP_ROUTES.SEARCH}?keyword=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
      setQuery('')
      onSearch?.()
    }
  }

  return (
    <div className={cn('relative w-full z-50', className)}>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={UI_TEXT.SEARCH_PLACEHOLDER}
          className="h-12 w-full pl-12 pr-12 text-base bg-white/10 border-white/20 focus:bg-background focus:border-primary/50 transition-all duration-300 rounded-xl text-white placeholder:text-gray-400"
        />
        {isLoading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:block">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        ) : query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-white/10 rounded-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        ) : null}
      </form>

      {/* Dropdown Results */}
      {!disableDropdown && (
        <SearchResults
          results={results}
          isOpen={isOpen && !isLoading}
          query={query}
          error={error}
          onResultClick={handleResultClick}
          onViewAllClick={handleViewAll}
          dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </div>
  )
}
