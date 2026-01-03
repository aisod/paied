"use client"

import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { PROGRAM_DATA } from '@/lib/constants/programData'
import { useTranslation } from '@/hooks/useTranslation'

export function CTA() {
  const { t, language } = useTranslation();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 leading-tight">
              {t.cta.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed">
              {t.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-10 sm:mb-12">
              <Button
                href="https://aisodx.tech"
                external
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto"
              >
                🚀 {t.cta.buttonPrimary}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Button
                href="/download"
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm bg-white/10 w-full sm:w-auto"
              >
                📥 {t.cta.buttonSecondary}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/20">
                <div className="text-2xl sm:text-3xl font-semibold mb-2">Feb 6</div>
                <div className="text-xs sm:text-sm opacity-90 font-medium">{language === 'pt' ? 'Início não-trabalhadores' : 'Non-workers start'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/20">
                <div className="text-2xl sm:text-3xl font-semibold mb-2">Feb 7</div>
                <div className="text-xs sm:text-sm opacity-90 font-medium">{language === 'pt' ? 'Início trabalhadores' : 'Workers start'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-white/20">
                <div className="text-2xl sm:text-3xl font-semibold mb-2">9 {language === 'pt' ? 'Meses' : 'Months'}</div>
                <div className="text-xs sm:text-sm opacity-90 font-medium">{language === 'pt' ? 'Para domínio de IA' : 'To AI mastery'}</div>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 text-sm sm:text-base opacity-90">
              <p className="font-medium">
                {t.cta.questions}{' '}
                <a
                  href="mailto:info@aisodinstitute.tech"
                  className="underline hover:no-underline font-semibold hover:text-gray-300 transition-colors"
                >
                  info@aisodinstitute.tech
                </a>
                {' '}{t.cta.orCall}{' '}
                <a
                  href="tel:+264814971482"
                  className="underline hover:no-underline font-semibold hover:text-gray-300 transition-colors"
                >
                  +264 81 497 1482
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
