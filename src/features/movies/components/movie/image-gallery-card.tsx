'use client'

import { useState } from 'react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { Film, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MovieImage } from '@/types'
import { TMDB_IMAGE_BASE } from '@/lib/axios'

interface ImageGalleryCardProps {
  images?: MovieImage[]
}

export function ImageGalleryCard({ images = [] }: ImageGalleryCardProps) {
  const [selectedImage, setSelectedImage] = useState<MovieImage | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-5 md:p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Film className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
            </div>
            Thư viện ảnh
            <span className="text-xs md:text-sm text-gray-500 font-normal ml-1">({images.length})</span>
          </h4>
          <button
            onClick={() => setSelectedImage(images[0])}
            className="text-xs text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
          >
            Xem tất cả
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.slice(0, 8).map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithFallback
                src={`${TMDB_IMAGE_BASE}/w300${image.file_path}`}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={75}
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
        {images.length > 8 && <p className="text-xs text-gray-500 text-center mt-3">+{images.length - 8} ảnh khác</p>}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="w-[95vw]! max-w-350! bg-black/95 border-white/10 p-4">
          <DialogHeader className="sr-only">
            <DialogTitle>Xem ảnh</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full">
            <ImageWithFallback
              src={`${TMDB_IMAGE_BASE}/original${selectedImage?.file_path}`}
              alt="Full size image"
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-3 px-1">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative w-24 h-14 shrink-0 rounded overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === image ? 'border-primary' : 'border-transparent hover:border-white/30'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <ImageWithFallback
                  src={`${TMDB_IMAGE_BASE}/w185${image.file_path}`}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                  quality={60}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
