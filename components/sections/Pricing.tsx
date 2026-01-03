"use client"

import { FadeIn } from '@/components/animations/FadeIn'
import { Button } from '@/components/ui/Button'
import { PROGRAM_DATA } from '@/lib/constants/programData'
import { useTranslation } from '@/hooks/useTranslation'

export function Pricing() {
  const { t } = useTranslation();

  const pricingOptions = [
    {
      id: 'free',
      title: PROGRAM_DATA.pricing.free.name,
      subtitle: PROGRAM_DATA.pricing.free.description,
      price: PROGRAM_DATA.pricing.free.price,
      period: '',
      features: PROGRAM_DATA.pricing.free.features,
      ctaText: t.pricing.free.cta,
      ctaLink: PROGRAM_DATA.links.aisodX,
      popular: false,
      highlight: false
    },
    {
      id: 'standard',
      title: PROGRAM_DATA.pricing.individual.name,
      subtitle: PROGRAM_DATA.pricing.individual.description,
      price: PROGRAM_DATA.pricing.individual.price,
      period: '/month',
      features: PROGRAM_DATA.pricing.individual.features,
      ctaText: t.pricing.standard.cta,
      ctaLink: PROGRAM_DATA.links.aisodX,
      popular: true,
      highlight: true
    },
    {
      id: 'premium',
      title: PROGRAM_DATA.pricing.school.name,
      subtitle: PROGRAM_DATA.pricing.school.description,
      price: PROGRAM_DATA.pricing.school.price,
      period: '/month',
      features: PROGRAM_DATA.pricing.school.features,
      ctaText: t.pricing.premium.cta,
      ctaLink: PROGRAM_DATA.links.aisodInstitute,
      popular: false,
      highlight: false
    }
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t.pricing.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {pricingOptions.map((option, index) => (
            <FadeIn key={option.id} delay={index * 150}>
              <div
                className={`relative h-full bg-white rounded-lg border transition-all duration-300 ${
                  option.highlight
                    ? 'border-gray-900 shadow-lg md:scale-105 z-10'
                    : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
                }`}
              >
                {option.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-gray-900 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-medium">
                      {t.common.mostPopular}
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed min-h-[3rem]">
                      {option.subtitle}
                    </p>
                  </div>

                  <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                    <div className="flex items-baseline flex-wrap">
                      <span className="text-4xl sm:text-5xl font-semibold text-gray-900">
                        {option.price}
                      </span>
                      {option.period && (
                        <span className="text-base sm:text-lg text-gray-600 ml-2 font-normal">
                          {option.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 sm:mb-8">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                            option.highlight ? 'text-gray-900' : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={option.ctaLink}
                    external
                    variant={option.highlight ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                  >
                    {option.ctaText}
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={600}>
          <div className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
            <p className="text-sm sm:text-base text-gray-600 mb-3">
              {t.pricing.footer}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {t.pricing.scholarships}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
