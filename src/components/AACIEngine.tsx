import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Brain, Mic, ShieldCheck } from 'lucide-react';
export function AACIEngine() {
  const { t } = useTranslation();
  return (
    <div id="engine" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-health-teal/10 text-health-teal text-xs font-bold tracking-widest uppercase">
          AACI Engine 1.0
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-health-dark">
          {t('engine.title')}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {t('engine.desc')}
        </p>
        <ul className="space-y-4">
          {[Brain, Mic, ShieldCheck].map((Icon, i) => (
            <li key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 shadow-neu-soft">
              <div className="h-10 w-10 center rounded-xl bg-white shadow-neu-soft">
                <Icon className="h-5 w-5 text-health-teal" />
              </div>
              <span className="font-medium text-health-dark">
                {i === 0 ? "Neural Clinical Processing" : i === 1 ? "Ambient Audio Stream" : "Secure Privacy Shield"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative aspect-square md:aspect-video lg:aspect-square bg-white rounded-5xl shadow-neu p-8 flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 px-8">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-health-teal rounded-full"
              animate={{ height: [10, 40, 20, 60, 10][i % 5] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
            />
          ))}
        </div>
        <div className="relative z-10 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/40 shadow-neu-soft">
          <p className="text-sm font-mono text-health-dark">
            <span className="text-health-teal">VOITHER:</span> "Patient presents with fatigue..."
          </p>
        </div>
      </motion.div>
    </div>
  );
}