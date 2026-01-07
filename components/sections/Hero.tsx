'use client';

import { Button } from '@/components/ui/Button';
import { PROGRAM_DATA } from '@/lib/constants/programData';
import { useTranslation } from '@/hooks/useTranslation';

export function Hero() {
  const { t, language } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
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
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Minimal badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs font-normal">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {t.hero.starting} {PROGRAM_DATA.startDates.nonWorkers}
          </div>

          {/* Main headline - refined typography hierarchy */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
              {t.hero.headline}
              <span className="block mt-3 font-semibold">{t.hero.role}<span className="font-normal text-gray-600">{t.hero.roleSecondary}</span></span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-500 mt-4">
                {t.hero.inMonths}
              </span>
            </h1>
          </div>

          {/* Subheadline - refined typography */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {PROGRAM_DATA.philosophy}
          </p>

          {/* Value proposition */}
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            {language === 'pt' 
              ? 'Junte-se a centenas de namibianos construindo aplicações reais de IA e transformando suas carreiras—' 
              : 'Join hundreds of Namibians building real AI applications and transforming their careers—'}
            <span className="font-normal text-gray-700">{language === 'pt' ? 'completamente GRÁTIS' : 'completely FREE'}</span>.
          </p>

          {/* Stats - refined spacing and typography - Mobile-first */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 pt-4 sm:pt-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-medium text-gray-900 mb-1">{PROGRAM_DATA.stats.duration}</div>
              <div className="text-xs text-gray-500 font-normal">{language === 'pt' ? 'Treinamento' : 'Training'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-medium text-gray-900 mb-1">{PROGRAM_DATA.stats.projects}</div>
              <div className="text-xs text-gray-500 font-normal">{language === 'pt' ? 'Projetos' : 'Projects'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-medium text-gray-900 mb-1">{PROGRAM_DATA.stats.skills}</div>
              <div className="text-xs text-gray-500 font-normal">{language === 'pt' ? 'Tecnologias' : 'Technologies'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-medium text-gray-900 mb-1">{PROGRAM_DATA.stats.support}</div>
              <div className="text-xs text-gray-500 font-normal">{language === 'pt' ? 'Suporte' : 'Support'}</div>
            </div>
          </div>

          {/* CTA Buttons - refined spacing and typography */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-10">
            <Button
              href="https://aisodx.tech/"
              external
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.hero.ctaPrimary}
            </Button>

            <Button
              href="/curriculum"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Trust indicators - refined spacing */}
          <div className="pt-6 text-xs text-gray-400 font-normal">
            <p>{t.hero.trustIndicators}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
