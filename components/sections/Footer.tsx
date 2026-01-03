'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { PROGRAM_DATA } from '@/lib/constants/programData';
import { useTranslation } from '@/hooks/useTranslation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Logo showText={false} size="md" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">PAIED Program</h3>
                <p className="text-xs sm:text-sm text-gray-400">AISOD Institute</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {PROGRAM_DATA.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {/* Social Media Links */}
              <a
                href="https://www.facebook.com/aisod.inc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/aisod_nam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.609.034 6.298.134c-1.311.1-2.204.266-2.99.567A5.94 5.94 0 001.464 2.09C1.163 2.876 1 3.77 1 5.08c-.034 1.311-.134 2.098-.134 5.72s.1 4.408.134 5.72c.1 1.31.266 2.204.567 2.99a5.94 5.94 0 002.09 2.554c.786.3 1.68.467 2.99.567 1.311.1 2.098.134 5.72.134s4.408-.034 5.72-.134c1.31-.1 2.204-.266 2.99-.567a5.94 5.94 0 002.554-2.09c.3-.786.467-1.68.567-2.99.1-1.311.134-2.098.134-5.72s-.034-4.408-.134-5.72c-.1-1.31-.266-2.204-.567-2.99A5.94 5.94 0 0019.91 1.464C19.124 1.163 18.23 1 17.24 1c-1.31-.034-2.098-.134-5.72-.134zm0 2.192c3.556 0 3.98.014 5.387.094 1.302.076 1.992.217 2.45.36.573.18 1.006.41 1.447.851.44.44.671.874.851 1.447.143.458.284 1.148.36 2.45.08 1.407.094 1.831.094 5.387s-.014 3.98-.094 5.387c-.076 1.302-.217 1.992-.36 2.45-.18.573-.41 1.006-.851 1.447-.44.44-.874.671-1.447.851-.458.143-1.148.284-2.45.36-1.407.08-1.831.094-5.387.094s-3.98-.014-5.387-.094c-1.302-.076-1.992-.217-2.45-.36-.573-.18-1.006-.41-1.447-.851-.44-.44-.671-.874-.851-1.447-.143-.458-.284-1.148-.36-2.45-.08-1.407-.094-1.831-.094-5.387s.014-3.98.094-5.387c.076-1.302.217-1.992.36-2.45.18-.573.41-1.006.851-1.447.44-.44.874-.671 1.447-.851.458-.143 1.148-.284 2.45-.36 1.407-.08 1.831-.094 5.387-.094z"/>
                  <path d="M12.017 6.182a5.835 5.835 0 100 11.67 5.835 5.835 0 000-11.67zm0 9.616a3.781 3.781 0 110-7.562 3.781 3.781 0 010 7.562z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@aisodx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://x.com/@aisodinstitute"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.threads.com/@aisod_nam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                aria-label="Threads"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 0C8.006 0 4.58 1.23 2.25 3.18c-.36.3-.72.63-1.05.96C.6 4.8.3 5.4.15 6c-.15.6-.15 1.2 0 1.8.15.6.45 1.2.9 1.65.45.45 1.05.75 1.65.9.6.15 1.2.15 1.8 0 .6-.15 1.2-.45 1.65-.9.3-.3.6-.6.75-.9.3-.6.45-1.2.45-1.8 0-1.2.45-2.25 1.2-3.15.75-.9 1.8-1.5 3-1.8 1.2-.3 2.4-.15 3.45.45 1.05.6 1.8 1.5 2.25 2.55.45 1.05.45 2.25 0 3.3-.45 1.05-1.2 1.95-2.25 2.55-1.05.6-2.25.75-3.45.45-1.2-.3-2.25-.9-3-1.8-.75-.9-1.2-1.95-1.2-3.15 0-.6.15-1.2.45-1.8.15-.3.45-.6.75-.9.45-.45 1.05-.75 1.65-.9.6-.15 1.2-.15 1.8 0 .6.15 1.2.45 1.65.9.45.45.75 1.05.9 1.65.15.6.15 1.2 0 1.8-.15.6-.45 1.2-.9 1.65-.3.3-.6.6-.96.9C4.58 22.77 8.006 24 12.186 24c4.18 0 7.606-1.23 9.936-3.18.36-.3.72-.63 1.05-.96.45-.45.75-1.05.9-1.65.15-.6.15-1.2 0-1.8-.15-.6-.45-1.2-.9-1.65-.45-.45-1.05-.75-1.65-.9-.6-.15-1.2-.15-1.8 0-.6.15-1.2.45-1.65.9-.3.3-.6.6-.75.9-.3.6-.45 1.2-.45 1.8 0 1.2-.45 2.25-1.2 3.15-.75.9-1.8 1.5-3 1.8-1.2.3-2.4.15-3.45-.45-1.05-.6-1.8-1.5-2.25-2.55-.45-1.05-.45-2.25 0-3.3.45-1.05 1.2-1.95 2.25-2.55 1.05-.6 2.25-.75 3.45-.45 1.2.3 2.25.9 3 1.8.75.9 1.2 1.95 1.2 3.15 0 .6-.15 1.2-.45 1.8-.15.3-.45.6-.75.9-.45.45-1.05.75-1.65.9-.6.15-1.2.15-1.8 0-.6-.15-1.2-.45-1.65-.9-.45-.45-.75-1.05-.9-1.65-.15-.6-.15-1.2 0-1.8.15-.6.45-1.2.9-1.65.3-.3.6-.6.96-.9C19.792 1.23 16.366 0 12.186 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {t.nav.curriculum}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  {t.nav.download}
                </Link>
              </li>
            </ul>
          </div>

          {/* AISOD Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">{t.footer.resources}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://aisodx.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  AISOD X - Premium Platform
                </a>
              </li>
              <li>
                <a
                  href="https://www.aisod.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  AISOD Main Website
                </a>
              </li>
              <li>
                <a
                  href="https://www.aisodinstitute.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  AISOD Institute
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">{t.footer.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="text-xs sm:text-sm text-gray-300">
                  <p>{PROGRAM_DATA.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-xs sm:text-sm text-gray-300">
                  <p>{PROGRAM_DATA.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  <p>{PROGRAM_DATA.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-400">
              © {currentYear} AISOD Institute. {t.footer.rights}
            </p>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                {language === 'pt' ? 'Termos de Serviço' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
