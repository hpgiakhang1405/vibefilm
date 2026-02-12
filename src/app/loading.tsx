'use client'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-105 h-105 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <div className="text-5xl font-black mb-6">
          <span className="bg-linear-to-r from-primary via-red-500 to-orange-400 bg-clip-text text-transparent">
            VibeFilm
          </span>
        </div>

        <div className="w-10 h-10 mx-auto rounded-full border-4 border-white/20 border-t-primary animate-spin" />

        <p className="mt-3 text-white/50 text-sm tracking-widest uppercase">Đang tải</p>
      </div>
    </div>
  )
}
