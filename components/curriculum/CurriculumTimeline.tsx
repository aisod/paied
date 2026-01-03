'use client'

import { Timeline } from '@/components/ui/Timeline'
import { programMonths } from '@/lib/constants/programData'
import { useTranslation } from '@/hooks/useTranslation'

export function CurriculumTimeline() {
  const { t } = useTranslation();

  const timelineItems = programMonths.map(month => ({
    month: month.month,
    title: month.title,
    focus: month.focus,
    tools: month.primaryTools,
    skills: month.keySkills.join(', '),
  }))

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            {t.curriculum.timeline.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t.curriculum.timeline.subtitle}
          </p>
        </div>

        <Timeline items={timelineItems} />
      </div>
    </section>
  )
}
