import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { MotionProvider } from '@/providers/motion-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

import { ScrollFix } from '@/components/shared/scroll-fix'
import { AmbientBackground } from '@/components/shared/ambient-background'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

import { env } from '@/lib/env'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'VibeFilm - Xem phim online chất lượng cao',
  description: 'Website xem phim online miễn phí, chất lượng cao, cập nhật liên tục.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  }
}

import { getGenres, getCountries } from '@/features/movies/services'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [genres, countries] = await Promise.all([getGenres(), getCountries()])

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.className} overflow-x-hidden`}>
        <ScrollFix />
        <MotionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Header genres={genres} countries={countries} />
              <AmbientBackground />
              <main className="flex-1">{children}</main>
              <Footer genres={genres} countries={countries} />
            </div>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
