'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

interface MonthNavigationProps {
  prevMonth: number | null
  nextMonth: number | null
  currentMonth: number
}

export function MonthNavigation({ prevMonth, nextMonth, currentMonth }: MonthNavigationProps) {
  const { t } = useTranslation()

  return (
    <section className="py-8 sm:py-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto">
            {prevMonth && (
              <Button
                href={`/curriculum/${prevMonth}`}
                variant="outline"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-5 sm:px-7 py-2.5 sm:py-3 text-sm font-medium rounded-md transition-colors duration-200 w-full sm:w-auto shadow-sm hover:shadow-md"
              >
                ← {t.curriculum.month} {prevMonth}
              </Button>
            )}
          </div>

          <div>
            <Link
              href="/curriculum"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {t.curriculum.viewAllMonths}
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            {nextMonth && (
              <Button
                href={`/curriculum/${nextMonth}`}
                className="bg-gray-900 text-white hover:bg-gray-800 px-5 sm:px-7 py-2.5 sm:py-3 text-sm font-medium rounded-md transition-colors duration-200 w-full sm:w-auto shadow-md hover:shadow-lg"
              >
                {t.curriculum.month} {nextMonth} →
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
