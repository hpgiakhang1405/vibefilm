'use client'

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#0a0a0a] pointer-events-none overflow-hidden">
      <div className="absolute top-[-10%] -left-[10%] w-[50vw] h-[50vw] max-w-150 max-h-150 bg-primary/20 rounded-full blur-[120px] md:blur-[180px]" />
      <div className="absolute bottom-[-10%] -right-[10%] w-[50vw] h-[50vw] max-w-150 max-h-150 bg-blue-500/20 rounded-full blur-[120px] md:blur-[180px]" />
    </div>
  )
}
