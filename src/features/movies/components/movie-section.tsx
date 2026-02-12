'use client'

import { Movie } from '@/types'
import { MovieCard } from '@/features/movies/components/movie-card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CarouselPreviousButton, CarouselNextButton } from '@/components/ui/carousel-navigation'
import { SectionHeader } from '@/components/ui/section-header'
import { SKELETON_COUNTS } from '@/lib/constants'

interface MovieSectionProps {
  title: string
  movies: Movie[]
  link?: string
  index?: number
  id?: string
}

export function MovieSection({ title, movies, link, index = 0, id }: MovieSectionProps) {
  return (
    <section id={id} className="relative space-y-4 px-4 md:px-12 group/section" data-index={index}>
      {/* Header */}
      <SectionHeader title={title} link={link} />

      {/* Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
          slidesToScroll: 2,
          skipSnaps: false,
          dragFree: false,
          containScroll: 'trimSnaps',
          duration: 30
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-3">
          {movies.map((movie, movieIndex) => (
            <CarouselItem
              key={movie._id}
              className="pl-2 md:pl-3 basis-[45%] sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
            >
              <MovieCard
                movie={movie}
                index={movieIndex}
                priority={index === 0 && movieIndex < SKELETON_COUNTS.CAROUSEL}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPreviousButton className="-left-4 lg:-left-6" />
        <CarouselNextButton className="-right-4 lg:-right-6" />
      </Carousel>
    </section>
  )
}
