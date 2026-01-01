import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { AACIEngine } from '@/components/AACIEngine';
import { QualityBarriers } from '@/components/QualityBarriers';
import { ProductSuite } from '@/components/ProductSuite';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import '@/lib/i18n';
export function LandingPage() {
  const { t } = useTranslation();
  const [heroImg, setHeroImg] = useState<string>('');
  useEffect(() => {
    fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Futuristic healthcare ambient room with clinical technology 8k' })
    })
    .then(r => r.json())
    .then(data => setHeroImg(data.url))
    .catch(() => setHeroImg('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200'));
  }, []);
  return (
    <div className="min-h-screen bg-health-bg font-sans selection:bg-health-teal/30">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-neu-soft border border-white/50">
                <Sparkles className="h-4 w-4 text-health-teal animate-pulse" />
                <span className="text-xs font-bold text-health-dark uppercase tracking-widest">Ambient Intelligence v1.0</span>
              </div>
              <h1 className="text-display leading-[1.05] tracking-tight text-health-dark">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-health-dark hover:bg-health-dark/90 text-white rounded-full px-8 py-7 text-lg shadow-xl transition-all hover:scale-105 active:scale-95">
                  {t('nav.start')} <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full px-8 py-7 text-lg shadow-neu-soft border border-white hover:bg-white/50">
                  {t('nav.features')}
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 rounded-5xl bg-white shadow-neu overflow-hidden p-3 rotate-3">
                <div className="h-full w-full rounded-4xl overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                  <img src={heroImg} alt="Healthcare AI" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 p-6 rounded-3xl bg-white shadow-neu-soft border border-white max-w-[200px]">
                <p className="text-xs font-bold text-health-teal uppercase mb-1">Live Processing</p>
                <p className="text-sm text-health-dark font-medium leading-snug">Ambience detected. Generating SOAP note...</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-health-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsGrid />
        </div>
      </section>
      {/* Engine Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AACIEngine />
        </div>
      </section>
      {/* Barriers Section */}
      <section className="py-20 md:py-32 bg-health-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QualityBarriers />
        </div>
      </section>
      {/* Suite Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-health-dark">
            Clinical Product Suite
          </h2>
          <ProductSuite />
        </div>
      </section>
      <footer className="py-20 border-t border-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            <span className="font-display font-bold text-2xl tracking-tighter">Microsoft Founders</span>
            <span className="font-display font-bold text-2xl tracking-tighter">Cloudflare</span>
            <span className="font-display font-bold text-2xl tracking-tighter">MongoDB</span>
            <span className="font-display font-bold text-2xl tracking-tighter">Stripe</span>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Built on <strong>Claude 3.5 Sonnet</strong> & <strong>Haiku</strong>, 
              <strong> VoyageAI</strong> Embeddings, and 
              <strong> Eleven Labs</strong> Agents.
            </p>
            <p className="text-xs text-muted-foreground/60 border border-muted/20 rounded-lg p-4 bg-muted/5">
              {t('footer.note')}
            </p>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground/40">© 2024 Voither Ambient-Agentic Systems</p>
        </div>
      </footer>
    </div>
  );
}