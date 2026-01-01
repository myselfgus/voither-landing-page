import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoLayout } from '@/components/DemoLayout';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Video, HeartPulse, Thermometer, User, Radio } from 'lucide-react';
export function CloudClinicDemo() {
  const { t } = useTranslation();
  const [pulse, setPulse] = useState(72);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <DemoLayout title={t('suite.clinic')}>
      <SEO title={t('seo.clinic')} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-5xl bg-health-dark shadow-neu overflow-hidden border-4 border-white">
            <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" alt="Consultation" className="w-full h-full object-cover opacity-60" />
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
              <Radio className="h-3 w-3" /> {t('demos.clinic.live')}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-4 border-white/20 center">
                <Video className="h-8 w-8 text-white/40" />
              </div>
            </div>
            <div className="absolute bottom-6 inset-x-6 flex items-end justify-between">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-[250px]">
                <p className="text-xs font-bold uppercase opacity-60 mb-1">Live Feed</p>
                <p className="text-sm font-medium">"I've been noticing some dizziness..."</p>
              </div>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="h-12 w-12 rounded-full bg-health-teal shadow-glow center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-4xl bg-white shadow-neu space-y-6">
            <h3 className="text-xl font-display font-bold text-health-dark flex items-center gap-2">
              <User className="h-5 w-5 text-health-teal" /> {t('demos.clinic.ehr')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-health-bg shadow-neu-inset text-center">
                <HeartPulse className="h-5 w-5 text-health-danger mx-auto mb-1" />
                <p className="text-2xl font-bold text-health-dark tabular-nums">{pulse}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">BPM</p>
              </div>
              <div className="p-4 rounded-2xl bg-health-bg shadow-neu-inset text-center">
                <Thermometer className="h-5 w-5 text-amber-500 mx-auto mb-1" />
                <p className="text-2xl font-bold text-health-dark tabular-nums">36.7</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Temp °C</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">{t('demos.clinic.history')}</p>
              {['Hypertension Control', 'Type 2 Diabetes', 'Seasonal Allergies'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-neu-soft text-sm font-medium text-health-dark">
                  <div className="h-2 w-2 rounded-full bg-health-teal" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-health-dark text-white shadow-neu space-y-2">
            <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">AI Agent Status</p>
            <p className="text-sm font-medium">{t('demos.clinic.status')}</p>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}