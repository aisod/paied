'use client'

import { useState, useMemo } from 'react'
import { extractModules, Module } from '@/lib/utils/moduleExtractor'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'

interface ModuleCardsProps {
  content: string
}

export function ModuleCards({ content }: ModuleCardsProps) {
  // Validate content
  const contentString = typeof content === 'string' ? content : String(content || '')
  
  if (!contentString || contentString.trim().length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Unable to load modules. Content is invalid or empty.</p>
      </div>
    )
  }
  
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  
  // Extract modules using the tested extractModules function
  const modules = useMemo(() => {
    try {
      return extractModules(contentString)
    } catch (error) {
      console.error('Error extracting modules:', error)
      return []
    }
  }, [contentString])
  
  if (modules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No modules found in the curriculum content.</p>
      </div>
    )
  }
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

      <div className="space-y-10">
        {modules.map((module) => {
          if (!module || !module.week || !module.title) {
            return null
          }
          
          return (
            <div key={module.week} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                {module.week}
              </div>

              {/* Content */}
              <div className="ml-8 flex-1">
                <div
                  className="block bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                  onClick={() => setExpandedModule(expandedModule === module.week ? null : module.week)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-gray-700">
                      {module.title}
                    </h3>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedModule === module.week ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {module.objectives && (
                    <p className="text-gray-600 font-medium mb-4">
                      <span className="font-semibold text-gray-900">Objectives: </span>
                      <span className="text-gray-700">{module.objectives}</span>
                    </p>
                  )}
                  
                  {expandedModule === module.week && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <MarkdownRenderer content={module.content} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
