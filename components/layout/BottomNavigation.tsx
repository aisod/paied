'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import { useState, useEffect } from 'react'

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
)

const ContactIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const navItems = [
    { href: '/', label: t.nav.home, icon: HomeIcon },
    { href: '/curriculum', label: t.nav.curriculum, icon: BookIcon },
    { href: '/about', label: t.nav.about, icon: InfoIcon },
    { href: '/download', label: t.nav.download, icon: DownloadIcon },
    { href: '/contact', label: t.nav.contact, icon: ContactIcon }
  ]
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg md:hidden touch-manipulation" 
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        height: 'calc(4rem + env(safe-area-inset-bottom, 0))'
      }}
      suppressHydrationWarning
    >
      <div className="flex items-center justify-around h-16 px-2" style={{ paddingLeft: 'env(safe-area-inset-left, 0.5rem)', paddingRight: 'env(safe-area-inset-right, 0.5rem)' }}>
        {navItems.map((item) => {
          // Only check active state on client to avoid hydration mismatch
          const isActive = mounted && (pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href)))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 min-h-[64px] transition-all duration-300 relative touch-manipulation active:scale-95 ${
                isActive
                  ? 'text-gray-900'
                  : 'text-gray-500 active:text-gray-700'
              }`}
              aria-label={item.label}
            >
              <item.icon className={`w-6 h-6 mb-1 transition-transform duration-300 ${
                isActive ? 'scale-110' : ''
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 rounded-t-full" style={{ bottom: 'env(safe-area-inset-bottom, 0)' }} />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
