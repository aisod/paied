"use client"

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

interface TimelineItem {
  month: number
  title: string
  focus: string
  tools: string
  skills: string
}

interface TimelineProps {
  items: TimelineItem[]
  onItemClick?: (month: number) => void
}

export function Timeline({ items, onItemClick }: TimelineProps) {
  const { t, language } = useTranslation();

  // Validate items array
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{language === 'pt' ? 'Nenhum item de currículo disponível.' : 'No curriculum items available.'}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

      <div className="space-y-10">
        {items.map((item, index) => {
          // Validate item data
          if (!item || !item.month || !item.title) {
            return null;
          }
          
          return (
            <div key={item.month} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                {item.month}
              </div>

              {/* Content */}
              <div className="ml-8 flex-1">
                <Link
                  href={`/curriculum/${item.month}`}
                  prefetch={true}
                  className="block bg-white rounded-lg border border-gray-200 shadow-sm p-8 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group no-underline"
                  onClick={(e) => {
                    // Call optional callback if provided
                    onItemClick?.(item.month);
                    // Don't prevent default - let Link handle navigation
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-gray-700">{item.title}</h3>
                    <span className="text-gray-400 group-hover:text-gray-600 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.curriculum.viewDetails} →
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-4">{t.common.focus}: <span className="text-gray-700">{item.focus}</span></p>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">{t.common.tools}:</span> <span className="text-gray-700">{item.tools}</span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-900">{t.common.skills}:</span> <span className="text-gray-700">{item.skills}</span>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
