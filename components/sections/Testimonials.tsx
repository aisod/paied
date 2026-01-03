'use client'

import { useState, useEffect } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Card } from '@/components/ui/Card'
import { useTranslation } from '@/hooks/useTranslation'

export function Testimonials() {
  const { t, language } = useTranslation();
  
  const testimonials = language === 'pt' ? [
    {
      name: "Maria Johnson",
      role: "Desenvolvedora de IA",
      company: "Tech Startup, Windhoek",
      content: "PAIED mudou completamente minha carreira. Comecei com zero experiência em programação e agora estou construindo aplicações de IA para empresas locais. A abordagem baseada em projetos tornou o aprendizado real e emocionante."
    },
    {
      name: "David Ndlovu",
      role: "Desenvolvedor Freelancer",
      company: "Contratante Independente",
      content: "O foco em IA ética no PAIED é exatamente o que a Namíbia precisa. Aprendi a construir soluções de IA responsáveis enquanto criava um portfólio que me trouxe meu primeiro cliente pagante em meses."
    },
    {
      name: "Sarah Amutenya",
      role: "Pesquisadora de IA",
      company: "Universidade da Namíbia",
      content: "De iniciante completo a contribuir para projetos de pesquisa em IA. O currículo estruturado do PAIED e o suporte da comunidade tornaram o mundo complexo da IA acessível e emocionante."
    }
  ] : [
    {
      name: "Maria Johnson",
      role: "AI Developer",
      company: "Tech Startup, Windhoek",
      content: "PAIED completely changed my career. I started with zero coding experience and now I'm building AI applications for local businesses. The project-based approach made learning real and exciting."
    },
    {
      name: "David Ndlovu",
      role: "Freelance Developer",
      company: "Independent Contractor",
      content: "The ethical AI focus in PAIED is exactly what Namibia needs. I learned to build responsible AI solutions while creating a portfolio that landed me my first paying client within months."
    },
    {
      name: "Sarah Amutenya",
      role: "AI Researcher",
      company: "University of Namibia",
      content: "From complete beginner to contributing to AI research projects. PAIED's structured curriculum and community support made the complex world of AI accessible and exciting."
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t.testimonials.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.testimonials.subtitle}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative max-w-5xl mx-auto">
            {/* Main Testimonial */}
            <Card className="text-center p-6 sm:p-10">
              <div className="mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-md">
                  <span className="text-3xl sm:text-4xl">👤</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-700 font-medium mb-2 text-base sm:text-lg">
                  {testimonials[currentIndex].role}
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  {testimonials[currentIndex].company}
                </p>
              </div>

              <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 italic mb-6 sm:mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200"
                aria-label={language === 'pt' ? 'Anterior' : 'Previous'}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                    }`}
                    aria-label={`${language === 'pt' ? 'Testemunho' : 'Testimonial'} ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-200"
                aria-label={language === 'pt' ? 'Próximo' : 'Next'}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="text-center mt-10 sm:mt-12">
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-12 bg-gray-50 rounded-xl px-6 sm:px-10 py-6 sm:py-8 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">150+</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">{language === 'pt' ? 'Estudantes Felizes' : 'Happy Students'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">95%</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">{language === 'pt' ? 'Taxa de Conclusão' : 'Completion Rate'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">4.9/5</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">{language === 'pt' ? 'Avaliação Média' : 'Average Rating'}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
