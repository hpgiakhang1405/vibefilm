import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type NavButtonProps = React.ComponentProps<typeof CarouselPrevious>

const baseStyles =
  'hidden md:flex h-12 w-12 rounded-full bg-black/40 hover:bg-primary border border-white/20 hover:border-primary text-white shadow-xl backdrop-blur-sm opacity-0 group-hover/section:opacity-100 transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-0 z-10'

export function CarouselPreviousButton({ className, ...props }: NavButtonProps) {
  return (
    <CarouselPrevious className={cn(baseStyles, className)} {...props}>
      <ChevronLeft className="h-6 w-6" />
      <span className="sr-only">Previous slide</span>
    </CarouselPrevious>
  )
}

export function CarouselNextButton({ className, ...props }: NavButtonProps) {
  return (
    <CarouselNext className={cn(baseStyles, className)} {...props}>
      <ChevronRight className="h-6 w-6" />
      <span className="sr-only">Next slide</span>
    </CarouselNext>
  )
}
