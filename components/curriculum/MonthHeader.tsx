'use client'

import { useTranslation } from '@/hooks/useTranslation'

interface MonthHeaderProps {
  monthNum: number
  title: string
  focus: string
}

export function MonthHeader({ monthNum, title, focus }: MonthHeaderProps) {
  const { t } = useTranslation()

  return (
    <section className="pt-16 sm:pt-20 pb-10 sm:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-normal mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            {t.curriculum.month} {monthNum} {t.curriculum.of} 9
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {focus}
          </p>
        </div>
      </div>
    </section>
  )
}
