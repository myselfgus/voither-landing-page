import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { StatsGrid } from '@/components/StatsGrid';
import { AACIEngine } from '@/components/AACIEngine';
import { QualityBarriers } from '@/components/QualityBarriers';
import { ProductSuite } from '@/components/ProductSuite';
import { FloatingChat } from '@/components/FloatingChat';
import { SEO } from '@/components/SEO';
import { ContactSection } from '@/components/ContactSection';
import { StartupBadges } from '@/components/StartupBadges';
import { HeroVisual } from '@/components/HeroVisual';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Activity } from 'lucide-react';
import '@/lib/i18n';
export function LandingPage() {
  const { t } = useTranslation();
  const [heroImg, setHeroImg] = useState<string>('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200');
  useEffect(() => {
    fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Futuristic healthcare ambient room with clinical technology 8k, photorealistic, cinematic lighting' })
    })
    .then(r => r.json())
    .then(data => {
      if (data.success && data.url) setHeroImg(data.url);
    })
    .catch(() => {});
  }, []);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  return (
    <div className="min-h-screen bg-health-bg font-sans selection:bg-health-teal/30 overflow-x-hidden">
      <SEO />
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden">
        <HeroVisual />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 backdrop-blur-xl shadow-neu-soft border border-white/60">
                <Sparkles className="h-4 w-4 text-health-teal animate-pulse" />
                <span className="text-[10px] font-black text-health-dark uppercase tracking-[0.2em]">Ambient Intelligence v1.0</span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-display leading-[0.95] tracking-tight text-health-dark">
                {t('hero.title')}
              </motion.h1>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                {t('hero.subtitle')}
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                <Link to="/medscribe">
                  <Button size="lg" className="bg-health-dark hover:bg-health-dark/90 text-white rounded-2xl px-10 py-8 text-lg font-bold shadow-2xl transition-all hover:scale-[1.03] active:translate-y-1 active:shadow-neu-active">
                    {t('nav.start')} <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#suite">
                  <Button variant="ghost" size="lg" className="rounded-2xl px-10 py-8 text-lg font-bold shadow-neu-soft border border-white/80 bg-white/40 backdrop-blur-md hover:bg-white/60 transition-all active:shadow-neu-active active:scale-95">
                    {t('nav.products')}
                  </Button>
                </a>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-health-bg shadow-sm overflow-hidden grayscale">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Activity className="h-3 w-3 text-health-teal" /> Verified by 500+ Clinicians
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square md:max-w-xl mx-auto w-full"
            >
              <div className="absolute inset-0 rounded-[4rem] bg-white shadow-neu overflow-hidden p-4 rotate-3 transform-gpu">
                <div className="h-full w-full rounded-[3.5rem] overflow-hidden grayscale-[0.1] hover:grayscale-0 transition-all duration-1000">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    src={heroImg}
                    alt="Healthcare AI Visualization"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 p-6 rounded-3xl bg-white/60 backdrop-blur-2xl shadow-neu border border-white/40 max-w-[200px] space-y-2 hidden md:block">
                <p className="text-[10px] font-black uppercase text-health-teal tracking-widest">Efficiency</p>
                <p className="text-2xl font-display font-bold">+14h/week</p>
                <p className="text-xs text-muted-foreground">Recovered clinical time per physician.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-health-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsGrid />
        </div>
      </section>
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AACIEngine />
        </div>
      </section>
      <section className="py-24 md:py-32 bg-health-bg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QualityBarriers />
        </div>
      </section>
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-health-dark">
              Clinical Product Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A cohesive ecosystem of ambient-agentic tools designed for high-performance clinical workflows.
            </p>
          </div>
          <ProductSuite />
        </div>
      </section>
      <StartupBadges />
      <ContactSection />
      <footer className="py-24 border-t border-muted/10 bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="flex items-center justify-center gap-2 mb-8">
             <h2 className="text-3xl font-display font-bold text-health-dark tracking-tighter">VOITHER</h2>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Voither leverages the power of <strong>Claude 3.5 Sonnet</strong>,
              <strong> VoyageAI</strong> Embeddings, and <strong>Eleven Labs</strong> Agents
              to deliver the world's most reliable AACI engine.
            </p>
            <div className="p-6 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-neu-soft inline-block max-w-lg">
              <p className="text-[10px] text-muted-foreground/80 font-bold uppercase leading-relaxed tracking-wider">
                {t('footer.note')}
              </p>
            </div>
          </div>
          <p className="text-[9px] font-black tracking-[0.3em] uppercase text-muted-foreground/30">
            © 2024 Voither Ambient-Agentic Systems • Built on Cloudflare Workers
          </p>
        </div>
      </footer>
      <FloatingChat />
    </div>
  );
}