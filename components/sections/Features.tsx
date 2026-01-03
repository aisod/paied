"use client"

import { FadeIn } from '@/components/animations/FadeIn'
import { Card } from '@/components/ui/Card'
import { useTranslation } from '@/hooks/useTranslation'

export function Features() {
  const { t, language } = useTranslation();

  const features = language === 'pt' ? [
    {
      id: 1,
      icon: "🎯",
      title: "Aprendizado Baseado em Projetos",
      description: "Aprenda construindo e lançando produtos reais alimentados por IA. Sem exames, apenas trabalho entregue que comprova suas habilidades."
    },
    {
      id: 2,
      icon: "🤖",
      title: "IA Ética em Primeiro Lugar",
      description: "Domine o desenvolvimento responsável de IA com diretrizes éticas integradas, consciência de viés e práticas de transparência."
    },
    {
      id: 3,
      icon: "🚀",
      title: "Amigável para Iniciantes",
      description: "Zero experiência em programação necessária. Ferramentas de IA preenchem todas as lacunas de conhecimento, permitindo desenvolvimento rápido de habilidades."
    },
    {
      id: 4,
      icon: "🌍",
      title: "Focado na Namíbia",
      description: "Currículo projetado para desafios e oportunidades locais, criando impacto real em nossas comunidades."
    },
    {
      id: 5,
      icon: "💼",
      title: "Pronto para Carreira",
      description: "Construa um portfólio profissional de projetos lançados que atraem empregadores, clientes e investidores."
    },
    {
      id: 6,
      icon: "📈",
      title: "Geração de Renda",
      description: "Comece a ganhar através de freelancing, produtos digitais e oportunidades de startup desde o primeiro dia."
    }
  ] : [
    {
      id: 1,
      icon: "🎯",
      title: "Project-Based Learning",
      description: "Learn by building and launching real AI-powered products. No exams, just shipped work that proves your skills."
    },
    {
      id: 2,
      icon: "🤖",
      title: "Ethical AI First",
      description: "Master responsible AI development with built-in ethical guidelines, bias awareness, and transparency practices."
    },
    {
      id: 3,
      icon: "🚀",
      title: "Beginner Friendly",
      description: "Zero coding experience needed. AI tools bridge all knowledge gaps, enabling rapid skill development."
    },
    {
      id: 4,
      icon: "🌍",
      title: "Namibia Focused",
      description: "Curriculum designed for local challenges and opportunities, creating real impact in our communities."
    },
    {
      id: 5,
      icon: "💼",
      title: "Career Ready",
      description: "Build a professional portfolio of launched projects that attract employers, clients, and investors."
    },
    {
      id: 6,
      icon: "📈",
      title: "Income Generating",
      description: "Start earning through freelancing, digital products, and startup opportunities from day one."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t.features.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.features.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 100}>
              <Card hover className="h-full p-6 sm:p-8 group">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
