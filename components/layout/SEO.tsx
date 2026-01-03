// SEO component - Not currently used as Next.js 13+ uses built-in metadata API
// This component is kept for potential future use but doesn't require next-seo

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    url?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
}

export function SEO({
  title = "AISOD PAIED Program - Free AI Engineering Course 2026",
  description = "Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch. Start February 6th, 2026.",
  canonical,
  openGraph
}: SEOProps) {
  // This component is a no-op as Next.js handles SEO via metadata exports
  // See app/layout.tsx and individual page.tsx files for SEO configuration
  return null
}