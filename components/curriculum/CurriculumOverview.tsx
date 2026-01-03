'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function CurriculumOverview() {
  const { t, language } = useTranslation()

  const keyOutcomes = language === 'pt' ? [
    "Construir e lançar múltiplos produtos reais alimentados por IA (sites, apps móveis, automações, agentes e modelos de IA)",
    "Ganhar domínio prático de ferramentas e linguagens em alta demanda",
    "Desenvolver um portfólio público forte de projetos lançados que atraem clientes freelancers, empregadores ou investidores",
    "Tornar-se capaz de gerar renda através de freelancing, venda de produtos digitais ou lançamento de startups"
  ] : [
    "Build and launch multiple real-world AI-powered products (websites, mobile apps, automations, agents and AI-models)",
    "Gain hands-on mastery of in-demand tools and languages",
    "Develop a strong public portfolio of launched projects that attracts freelance clients, employers, or investors",
    "Become capable of earning income through freelancing, selling digital products, or launching startups"
  ]

  const technicalStack = language === 'pt' ? {
    mobile: 'Flutter + Dart (principal) ou React Native',
    web: 'Next.js + React',
    backend: 'Supabase',
    ai: 'Python, LangChain, Hugging Face',
    other: 'HTML, CSS, JavaScript, LoRa, TensorFlow, GitHub'
  } : {
    mobile: 'Flutter + Dart (primary) or React Native',
    web: 'Next.js + React',
    backend: 'Supabase',
    ai: 'Python, LangChain, Hugging Face',
    other: 'HTML, CSS, JavaScript, LoRa, TensorFlow, GitHub'
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            {t.curriculum.overview.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Key Features */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              {language === 'pt' ? 'Resultados Principais' : 'Key Outcomes'}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {keyOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-3 mt-1">•</span>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Stack */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              {t.curriculum.overview.technicalStack}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <span className="font-medium text-gray-900">{language === 'pt' ? 'Mobile: ' : 'Mobile: '}</span>
                <span className="text-sm sm:text-base text-gray-700">{technicalStack.mobile}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">{language === 'pt' ? 'Web: ' : 'Web: '}</span>
                <span className="text-sm sm:text-base text-gray-700">{technicalStack.web}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">{language === 'pt' ? 'Backend: ' : 'Backend: '}</span>
                <span className="text-sm sm:text-base text-gray-700">{technicalStack.backend}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">{language === 'pt' ? 'IA: ' : 'AI: '}</span>
                <span className="text-sm sm:text-base text-gray-700">{technicalStack.ai}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">{language === 'pt' ? 'Outros: ' : 'Other: '}</span>
                <span className="text-sm sm:text-base text-gray-700">{technicalStack.other}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
