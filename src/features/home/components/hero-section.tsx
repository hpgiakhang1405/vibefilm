'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Movie } from '@/types'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { CarouselNextButton, CarouselPreviousButton } from '@/components/ui/carousel-navigation'
import { HeroBackground } from './hero/hero-background'
import { HeroContent } from './hero/hero-content'
import { TIMING, DOM_IDS } from '@/lib/constants'
import { useScrollTo } from '@/hooks/use-scroll-to'

interface HeroSectionProps {
  movies: Movie[]
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const { scrollToId } = useScrollTo()

  const handleScrollDown = () => {
    // Try to find the header to calculate offset dynamically if needed,
    // but for now let's use a safe estimate or valid ID.
    // The original code tried to be very smart about header height.
    // We can replicate that logic inside the hook or just pass an offset.
    // For now, let's keep it simple and use the ID.

    // Note: The ID in page.tsx is `${DOM_IDS.MOVIE_SECTION_BASE}-0`
    const targetId = `${DOM_IDS.MOVIE_SECTION_BASE}-0`

    // Quick/dirty check for header height similar to original logic could be done here,
    // but let's trust a fixed offset for consistency or improve the hook later.
    // Original logic: -headerHeight - 20.
    // Let's assume header is ~80px.

    const success = scrollToId(targetId, { offset: -100 })
    if (!success) {
      window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })
    }
  }

  // Autoplay Plugin Ref
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: TIMING.CAROUSEL_AUTOPLAY,
      stopOnInteraction: true,
      stopOnMouseEnter: true
    })
  )

  // Handle Carousel Events
  React.useEffect(() => {
    if (!api) return

    let prev = api.selectedScrollSnap()
    setCurrent(prev)

    const onSelect = () => {
      const next = api.selectedScrollSnap()
      const last = movies.length - 1

      // Calculate direction logic
      let dir = next > prev ? 1 : -1
      if (prev === last && next === 0) dir = 1
      if (prev === 0 && next === last) dir = -1

      setDirection(dir)
      prev = next
      setCurrent(next)
      autoplayPlugin.current.reset()
    }

    api.on('select', onSelect)

    // Cleanup listener when component unmounts or api changes
    return () => {
      api.off('select', onSelect)
    }
  }, [api, movies.length])

  return (
    <Carousel
      setApi={setApi}
      plugins={[autoplayPlugin.current, Fade()]}
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        skipSnaps: false,
        dragFree: false,
        containScroll: 'trimSnaps',
        duration: 20
      }}
      className="w-full relative group bg-black mb-0"
    >
      <CarouselContent>
        {movies.map((movie, index) => {
          const isActive = current === index

          return (
            <CarouselItem key={movie._id}>
              <div className="relative h-screen w-full overflow-hidden bg-[#050505]">
                <HeroBackground movie={movie} isActive={isActive} direction={direction} priority={index === 0} />
                <HeroContent movie={movie} isActive={isActive} />
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>

      {/* NAVIGATION BUTTONS */}
      <CarouselPreviousButton className="left-4 md:left-8 group-hover:opacity-100" />
      <CarouselNextButton className="right-4 md:right-8 group-hover:opacity-100" />

      {/* SCROLL DOWN INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer mix-blend-difference"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] font-medium text-white shadow-black drop-shadow-lg">
            Khám phá
          </span>
          <ChevronDown className="h-6 w-6 text-white" />
        </motion.div>
      </motion.div>
    </Carousel>
  )
}
