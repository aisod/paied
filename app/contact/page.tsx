import { Metadata } from 'next'
import { ContactContent } from '@/components/contact/ContactContent'
import { PROGRAM_DATA } from '@/lib/constants/programData'

export const metadata: Metadata = {
  title: 'Contact PAIED Program | AISOD Institute',
  description: 'Get in touch with AISOD Institute for questions about the PAIED program. Free AI engineering course 2026.',
}

export default function ContactPage() {
  return <ContactContent />
}
