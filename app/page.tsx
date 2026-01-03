import { Hero } from '@/components/sections/Hero'
import ProgramOverview from '@/components/sections/ProgramOverview'
import { Features } from '@/components/sections/Features'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AISOD PAIED Program - Free AI Engineering Course 2026',
  description: 'Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch. Starting February 6th & 7th, 2026.',
  keywords: 'AI engineering course, AI developer training, free AI course, Namibia tech education, practical AI training, Flutter development, Next.js training, Supabase, ethical AI, career launch',
  authors: [{ name: 'AISOD Institute' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paied.aisodx.tech',
    title: 'AISOD PAIED Program - Free AI Engineering Course 2026',
    description: 'Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AISOD PAIED Program - Free AI Engineering Course'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aisodinstitute',
    creator: '@aisodinstitute'
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramOverview />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  )
}