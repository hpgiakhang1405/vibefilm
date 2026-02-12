'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Keyword } from '@/types'
import { APP_ROUTES } from '@/lib/constants'

interface KeywordsCardProps {
  keywords?: Keyword[]
}

export function KeywordsCard({ keywords = [] }: KeywordsCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!keywords || keywords.length === 0) {
    return null
  }

  const displayedKeywords = keywords.slice(0, 10)
  const remainingCount = keywords.length - 10

  return (
    <>
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Tag className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
            </div>
            Từ khóa
            <span className="text-xs md:text-sm text-gray-500 font-normal ml-1">({keywords.length})</span>
          </h4>
          {keywords.length > 10 && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
            >
              Xem tất cả
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {displayedKeywords.map((keyword) => (
            <Link
              key={keyword.tmdb_keyword_id}
              href={`${APP_ROUTES.SEARCH}?keyword=${encodeURIComponent(keyword.name_vn || keyword.name)}`}
              className="text-xs text-gray-300 bg-black/30 px-3 py-1.5 rounded-full border border-white/5 hover:bg-primary/20 hover:border-primary/30 transition-all cursor-pointer"
              title={keyword.name}
            >
              {keyword.name_vn || keyword.name}
            </Link>
          ))}
          {remainingCount > 0 && (
            <button onClick={() => setIsOpen(true)} className="text-xs text-primary px-3 py-1.5 font-medium">
              +{remainingCount}
            </button>
          )}
        </div>
      </div>

      {/* Dialog for all keywords */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl! max-h-[70vh] overflow-y-auto bg-[#1a1a1a]/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Tag className="w-5 h-5 text-orange-400" />
              </div>
              Tất cả từ khóa ({keywords.length})
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {keywords.map((keyword) => (
              <Link
                key={keyword.tmdb_keyword_id}
                href={`${APP_ROUTES.SEARCH}?keyword=${encodeURIComponent(keyword.name_vn || keyword.name)}`}
                className="text-sm text-gray-300 bg-black/30 px-4 py-2 rounded-full border border-white/5 hover:bg-primary/20 hover:border-primary/30 transition-all cursor-pointer"
                title={keyword.name}
                onClick={() => setIsOpen(false)}
              >
                {keyword.name_vn || keyword.name}
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
