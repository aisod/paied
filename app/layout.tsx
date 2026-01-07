import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { PWAInstaller } from '@/components/PWAInstaller'
import { MobileApp } from '@/components/MobileApp'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AISOD PAIED Program - Free AI Engineering Course 2026',
  description: 'Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch. Start February 6th, 2026.',
  icons: {
    icon: [
      { url: '/images/AISOD Institute logo new.png', type: 'image/png' },
      { url: '/images/AISOD Institute logo new.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/AISOD Institute logo new.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/AISOD Institute logo new.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PAIED',
  },
  formatDetection: {
    telephone: false,
  },
}

// Viewport configuration for mobile-first design (Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Additional mobile web app capability */}
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Viewport fit for notched devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <ErrorBoundary>
          <LanguageProvider>
            <PWAInstaller />
            <MobileApp />
            <Navbar />
            <main className="min-h-screen pt-16 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNavigation />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}