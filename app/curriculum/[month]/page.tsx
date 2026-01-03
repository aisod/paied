import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer'
import { MonthNavigation } from '@/components/curriculum/MonthNavigation'
import { MonthHeader } from '@/components/curriculum/MonthHeader'
import { ModuleCards } from '@/components/curriculum/ModuleCards'
import { getMarkdownFile } from '@/lib/utils/markdown'
import { programMonths } from '@/lib/constants/programData'

interface PageProps {
  params: Promise<{
    month: string
  }> | {
    month: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Handle both Promise and direct params (Next.js 14 vs 15 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params
  const monthNum = parseInt(resolvedParams.month)
  
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 9) {
    return {
      title: 'Month Not Found - PAIED Program',
    }
  }

  const monthData = programMonths.find(m => m.month === monthNum)
  
  if (!monthData || !monthData.filename) {
    return {
      title: 'Month Not Found - PAIED Program',
    }
  }

  const markdownData = await getMarkdownFile(monthData.filename)

  return {
    title: `Month ${monthNum}: ${monthData.title} - PAIED Program Curriculum`,
    description: markdownData?.content?.slice(0, 160) || `Detailed curriculum for ${monthData.title}`,
  }
}

export async function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({
    month: (i + 1).toString(),
  }))
}

export default async function MonthPage({ params }: PageProps) {
  // Handle both Promise and direct params (Next.js 14 vs 15 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params
  const monthNum = parseInt(resolvedParams.month)
  
  // Validate month number
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 9) {
    notFound()
  }

  const monthData = programMonths.find(m => m.month === monthNum)
  
  if (!monthData || !monthData.filename) {
    notFound()
  }

  const markdownData = await getMarkdownFile(monthData.filename)

  if (!markdownData || !markdownData.content) {
    notFound()
  }

  const prevMonth = monthNum > 1 ? monthNum - 1 : null
  const nextMonth = monthNum < 9 ? monthNum + 1 : null

  return (
    <div className="relative min-h-screen bg-white pb-20 md:pb-0">
      {/* Paper-like grid background - subtle and elegant */}
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
      
      <div className="relative z-10">
        {/* Header */}
        <MonthHeader monthNum={monthNum} title={monthData.title} focus={monthData.focus} />

        {/* Module Cards - Show like timeline on curriculum page */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                Modules & Weeks
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Explore each week's curriculum and objectives
              </p>
            </div>
            <ModuleCards content={markdownData.content} />
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-12">
              <MarkdownRenderer content={markdownData.content} />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <MonthNavigation prevMonth={prevMonth} nextMonth={nextMonth} currentMonth={monthNum} />
      </div>
    </div>
  )
}
