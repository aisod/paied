import { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About PAIED Program | CEO Message',
  description: 'Read the inspiring message from AISOD CEO Joel Tiago about the PAIED program and its transformative impact.',
}

export default function AboutPage() {
  return <AboutContent />
}
