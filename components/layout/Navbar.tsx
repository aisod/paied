'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/curriculum', label: t.nav.curriculum },
    { href: '/about', label: t.nav.about },
    { href: '/download', label: t.nav.download },
    { href: '/contact', label: t.nav.contact }
  ]

  const externalLinks = [
    { href: 'https://aisodx.tech', label: 'AISOD X (Free)', primary: true },
    { href: 'https://www.aisod.tech', label: 'AISOD Main' },
    { href: 'https://www.aisodinstitute.tech', label: 'AISOD Institute' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo showText={true} size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Selector & External Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  language === 'pt'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Português"
              >
                PT
              </button>
            </div>
            
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  link.primary
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Mobile-first with proper touch target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 min-w-[44px] min-h-[44px] rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 touch-manipulation flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 min-h-[44px] text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors text-sm touch-manipulation flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t pt-4 space-y-2 px-4">
              {/* Mobile Language Toggle */}
              <div className="flex items-center space-x-2 pb-2">
                <span className="text-xs text-gray-600">{language === 'pt' ? 'Idioma:' : 'Language:'}</span>
                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setIsOpen(false)
                    }}
                    className={`px-4 py-2.5 min-h-[44px] text-xs font-medium transition-colors touch-manipulation ${
                      language === 'en'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 active:bg-gray-50'
                    }`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('pt')
                      setIsOpen(false)
                    }}
                    className={`px-4 py-2.5 min-h-[44px] text-xs font-medium transition-colors touch-manipulation ${
                      language === 'pt'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 active:bg-gray-50'
                    }`}
                    aria-label="Switch to Portuguese"
                  >
                    PT
                  </button>
                </div>
              </div>
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-4 py-3 min-h-[44px] rounded-md text-xs sm:text-sm font-medium transition-colors touch-manipulation flex items-center ${
                    link.primary
                      ? 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700'
                      : 'text-gray-700 hover:text-gray-900 active:bg-gray-50 border border-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
