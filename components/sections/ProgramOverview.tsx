'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Timeline } from '@/components/ui/Timeline'
import { Button } from '@/components/ui/Button'
import { programMonths } from '@/lib/constants/programData'
import { useTranslation } from '@/hooks/useTranslation'

export default function ProgramOverview() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const { t, language } = useTranslation();

  const timelineItems = programMonths.map(month => ({
    month: month.month,
    title: month.title,
    focus: month.focus,
    tools: month.primaryTools,
    skills: month.keySkills.join(', '),
  }))

  const handleMonthClick = (monthId: number) => {
    setSelectedMonth(monthId)
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {language === 'pt' ? 'Jornada de 9 Meses para Domínio de IA' : '9-Month Journey to AI Mastery'}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === 'pt' 
                ? 'De iniciante completo a engenheiro de IA profissional. Cada mês constrói sobre o anterior, culminando em produtos lançados que comprovam suas habilidades.'
                : 'From complete beginner to professional AI engineer. Each month builds on the last, culminating in launched products that prove your skills.'}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mb-8 sm:mb-12">
            <Timeline items={timelineItems} onItemClick={handleMonthClick} />
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="text-center flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <Button
              href="/curriculum"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.curriculum.viewAllMonths}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button
              href="/download"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.common.download} {language === 'pt' ? 'Manual Completo' : 'Complete Manual'}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
