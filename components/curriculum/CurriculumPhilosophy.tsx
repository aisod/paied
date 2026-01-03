'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function CurriculumPhilosophy() {
  const { t } = useTranslation()

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">
            {t.curriculum.philosophy.title}
          </h2>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 italic mb-4 sm:mb-6 leading-relaxed">
            {t.curriculum.philosophy.quote}
          </blockquote>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            {t.curriculum.philosophy.subtitle}
          </p>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
              {t.curriculum.philosophy.assessment}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {t.curriculum.philosophy.assessmentDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
