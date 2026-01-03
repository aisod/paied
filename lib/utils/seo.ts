import { Metadata } from 'next'

export function generateSEO(
  title?: string,
  description?: string,
  path?: string
): Metadata {
  const baseTitle = 'AISOD PAIED Program - Free AI Engineering Course 2026'
  const baseDescription = 'Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch. Start February 6th, 2026.'
  const baseUrl = 'https://paied.aisodx.tech'

  return {
    title: title || baseTitle,
    description: description || baseDescription,
    keywords: [
      'AI engineering course',
      'AI developer training',
      'free AI course',
      'Namibia tech education',
      'practical AI training',
      'Flutter development',
      'Next.js training',
      'Supabase',
      'ethical AI',
      'career launch'
    ],
    authors: [{ name: 'AISOD Institute' }],
    creator: 'AISOD Institute',
    publisher: 'AISOD Institute',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: path ? `${baseUrl}${path}` : baseUrl,
    },
    openGraph: {
      title: title || baseTitle,
      description: description || baseDescription,
      url: path ? `${baseUrl}${path}` : baseUrl,
      siteName: 'AISOD PAIED Program',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'AISOD PAIED Program - Free AI Engineering Course'
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || baseTitle,
      description: description || baseDescription,
      images: [`${baseUrl}/images/og-image.jpg`],
      creator: '@aisodinstitute',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add actual verification code
    },
  }
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AISOD PAIED Program - Practical AI Engineering & Development',
    description: 'Free 9-month AI engineering course transforming beginners into AI developers with hands-on projects and ethical AI focus.',
    provider: {
      '@type': 'Organization',
      name: 'AISOD Institute',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Namibia',
        addressLocality: 'Windhoek',
        streetAddress: 'Office above Ok Shop, 1st floor Independence Ave'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+264-81-497-1482',
        email: 'info@aisodinstitute.tech'
      },
      sameAs: [
        'https://aisodx.tech',
        'https://www.aisod.tech',
        'https://www.aisodinstitute.tech'
      ]
    },
    courseMode: 'online',
    courseWorkload: 'PT10H',
    timeRequired: 'P9M',
    educationalCredentialAwarded: 'AI Engineering & Development Certificate',
    teaches: [
      'Flutter + Dart development',
      'Next.js + React web development',
      'AI agents and automation',
      'Ethical AI practices',
      'Project-based learning'
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: 'Joel Tiago',
        jobTitle: 'CEO, AISOD Institute'
      },
      startDate: '2026-02-06',
      endDate: '2026-11-06',
      courseWorkload: 'PT10H',
      offers: [
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'NAD',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01'
        },
        {
          '@type': 'Offer',
          name: 'Premium Support',
          description: 'Additional tutoring and premium services available',
          availability: 'https://schema.org/InStock'
        }
      ]
    }
  }
}