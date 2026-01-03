'use client'

import { PROGRAM_DATA } from '@/lib/constants/programData'
import { useTranslation } from '@/hooks/useTranslation'

export function ContactContent() {
  const { t, language } = useTranslation()

  return (
    <div className="relative min-h-screen bg-white">
      {/* Paper-like grid background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 0'
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t.contact.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {language === 'pt' ? 'Endereço' : 'Address'}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {PROGRAM_DATA.contact.address}
              </p>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {t.contact.contacts}
              </h3>
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p>
                  <a href={`tel:${PROGRAM_DATA.contact.phone.replace(/\s/g, '')}`} className="hover:text-gray-900 transition-colors">
                    {PROGRAM_DATA.contact.phone}
                  </a>
                </p>
                <p>
                  <a href="mailto:info@aisodinstitute.tech" className="hover:text-gray-900 transition-colors">
                    {PROGRAM_DATA.contact.email}
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {language === 'pt' ? 'Sites Relacionados' : 'Related Websites'}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://aisodx.tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline font-medium transition-colors text-sm sm:text-base"
                  >
                    AISOD X - {language === 'pt' ? 'Acesso Gratuito' : 'Free Access'}
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.aisod.tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline font-medium transition-colors text-sm sm:text-base"
                  >
                    {language === 'pt' ? 'Site Principal AISOD' : 'AISOD Main Website'}
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.aisodinstitute.tech" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline font-medium transition-colors text-sm sm:text-base"
                  >
                    AISOD Institute
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
