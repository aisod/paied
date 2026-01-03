'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function AboutContent() {
  const { t, language } = useTranslation()

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
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t.about.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* CEO Message Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <div className="space-y-6 sm:space-y-8">
            {/* CEO Header */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                {language === 'pt' ? 'Uma Palavra do CEO – Joel Tiago' : 'A Word from the CEO – Joel Tiago'}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {language === 'pt' ? 'Bem-vindo ao Programa de Engenharia e Desenvolvimento de IA Prático (PAIED)!' : 'Welcome to the Practical AI Engineering & Development (PAIED) Program!'}
              </p>
            </div>

            {/* Greeting */}
            <div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                {language === 'pt' ? 'Caros Futuros Construtores de IA,' : 'Dear Future AI Builders,'}
              </p>
            </div>

            {/* Main Content */}
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              <p>
                {language === 'pt' 
                  ? 'Como CEO da AISOD, tenho muito orgulho de dar as boas-vindas a você nesta jornada transformadora. Em um mundo onde a IA está remodelando tudo, a Namíbia e a África não devem apenas consumir tecnologia—devemos criar e possuí-la. É por isso que construímos o Programa PAIED: para capacitar iniciantes como você com habilidades práticas e hands-on para projetar, programar, automatizar e lançar produtos reais alimentados por IA em horas—não anos.'
                  : 'As the CEO of AISOD, I am incredibly proud to welcome you to this transformative journey. In a world where AI is reshaping everything, Namibia and Africa must not just consume technology—we must create and own it. That\'s why we built the PAIED Program: to empower beginners like you with practical, hands-on skills to design, code, automate, and launch real AI-powered products in hours—not years.'}
              </p>

              <p>
                {language === 'pt' 
                  ? 'Nossa filosofia é simples e poderosa: "Eles podem não acreditar nos papéis, mas você será pago pelos projetos funcionais." Aqui, não há exames intermináveis ou teoria abstrata. Seu sucesso é medido pelo que você constrói e lança—sites, apps móveis, agentes, modelos personalizados—todos usando ferramentas de IA éticas e nossa stack preferida (Flutter/Dart, React Native, Next.js, Supabase, Python, HTML, CSS e JavaScript, LoRa, TensorFlow, Huggingface, GitHub, Langchain e etc,...).'
                  : 'Our philosophy is simple and powerful: "They may not believe the papers, but you will get paid for the working projects." Here, there are no endless exams or abstract theory. Your success is measured by what you build and launch—websites, mobile apps, agents, custom models—all using ethical AI tools and our preferred stack (Flutter/Dart, React Native, Next.js, Supabase, Python, HTML, CSS and JavaScript, LoRa, TensorFlow, Huggingface, GitHub, Langchain and etc,...).'}
              </p>

              <p>
                {language === 'pt' 
                  ? 'Ao longo desses 9 meses, você passará de zero experiência para entregar soluções de nível profissional que resolvem problemas reais na Namíbia—de automações de negócios a apps inovadores. E com o AISOD X como seu ecossistema, seus projetos podem gerar renda, atrair financiamento e impactar comunidades.'
                  : 'Over these 9 months, you\'ll go from zero experience to shipping professional-grade solutions that solve real problems in Namibia—from business automations to innovative apps. And with AISOD X as your ecosystem, your projects can earn income, attract funding, and impact communities.'}
              </p>

              <p>
                {language === 'pt' 
                  ? 'Isso é mais do que um programa—é sua entrada na revolução de IA da África. Estamos aqui para apoiá-lo em cada etapa: mentores, comunidade, sessões ao vivo e ferramentas para tornar coisas complexas simples.'
                  : 'This is more than a program—it\'s your entry into Africa\'s AI revolution. We\'re here to support you every step: mentors, community, live sessions, and tools to make complex things simple.'}
              </p>

              <div className="pt-4 space-y-2">
                <p className="font-semibold text-gray-900">
                  {language === 'pt' 
                    ? 'Sonhe Grande. Acredite em si mesmo. Construa com ousadia. Lance sem medo.'
                    : 'Dream Big. Believe in yourself. Build boldly. Launch fearlessly.'}
                </p>
                <p className="text-gray-700">
                  {language === 'pt' ? 'O futuro é seu para programar.' : 'The future is yours to code.'}
                </p>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6 sm:pt-8 border-t border-gray-200">
              <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1">Joel Tiago</p>
              <p className="text-sm sm:text-base text-gray-600 mb-1">{language === 'pt' ? 'CEO, Instituto AISOD' : 'CEO, AISOD Institute'}</p>
              <p className="text-xs sm:text-sm text-gray-500">{language === 'pt' ? 'Windhoek, Namíbia' : 'Windhoek, Namibia'}</p>
              <p className="text-xs sm:text-sm text-gray-500">December 31, 2025</p>
            </div>
          </div>
        </div>

        {/* Program Philosophy Section */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8 lg:p-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
            {t.about.mission}
          </h3>
          <div className="space-y-4 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
            <p>
              {language === 'pt' 
                ? 'O Programa PAIED é projetado para transformar iniciantes em Engenheiros e Desenvolvedores de IA profissionais através de aprendizado prático e baseado em projetos. Acreditamos em aprender fazendo—construindo aplicações reais que resolvem problemas reais.'
                : 'The PAIED Program is designed to transform beginners into professional AI Engineers and Developers through hands-on, project-based learning. We believe in learning by doing—building real applications that solve real problems.'}
            </p>
            <p>
              {language === 'pt' 
                ? 'Nosso currículo foca em habilidades práticas usando ferramentas e tecnologias modernas, garantindo que cada graduado esteja pronto para contribuir significativamente para o ecossistema tecnológico em crescimento da Namíbia e a revolução de IA da África.'
                : 'Our curriculum focuses on practical skills using modern tools and technologies, ensuring that every graduate is ready to contribute meaningfully to Namibia\'s growing tech ecosystem and Africa\'s AI revolution.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
