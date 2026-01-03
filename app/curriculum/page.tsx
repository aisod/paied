import { Metadata } from 'next'
import { CurriculumHeader } from '@/components/curriculum/CurriculumHeader'
import { CurriculumOverview } from '@/components/curriculum/CurriculumOverview'
import { CurriculumTimeline } from '@/components/curriculum/CurriculumTimeline'
import { CurriculumPhilosophy } from '@/components/curriculum/CurriculumPhilosophy'

export const metadata: Metadata = {
  title: 'PAIED Program Curriculum - 9 Months to AI Engineering Mastery',
  description: 'Explore the complete PAIED curriculum: 9 months of hands-on AI training from Flutter development to advanced AI integrations.',
}

export default function CurriculumPage() {
  return (
    <div className="relative min-h-screen bg-white">
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
        <CurriculumHeader />

        {/* Program Overview */}
        <CurriculumOverview />

        {/* Timeline */}
        <CurriculumTimeline />

        {/* Philosophy */}
        <CurriculumPhilosophy />
      </div>
    </div>
  )
}