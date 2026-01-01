import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cloud, Rocket, Code, Shield, Globe, Cpu } from 'lucide-react';
export function StartupBadges() {
  const { t } = useTranslation();
  const partners = [
    { name: 'Microsoft Founders Hub', icon: Rocket },
    { name: 'Cloudflare Startup', icon: Cloud },
    { name: 'MongoDB for Startups', icon: Code },
    { name: 'Stripe Climate', icon: Globe },
    { name: 'NVIDIA Inception', icon: Cpu },
    { name: 'HIPAA Compliant', icon: Shield }
  ];
  return (
    <section className="py-20 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-display text-4xl font-bold text-health-dark">
            {t('partners.title')}
          </h2>
          <div className="h-1 w-20 bg-health-teal mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="group flex flex-col items-center gap-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
            >
              <div className="h-16 w-16 rounded-2xl bg-white shadow-neu-soft center group-hover:shadow-neu">
                <partner.icon className="h-8 w-8 text-health-teal" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-tight max-w-[100px] text-muted-foreground group-hover:text-health-dark transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}