'use client'

import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

export function CurriculumHeader() {
  const { t, language } = useTranslation()

  return (
    <section className="pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t.curriculum.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {t.curriculum.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              href="/download" 
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.common.download} {language === 'pt' ? 'Manual Completo' : 'Full Manual'}
            </Button>
            <Button 
              href="https://aisodx.tech" 
              external 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.common.getStarted}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
