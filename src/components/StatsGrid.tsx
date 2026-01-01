import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Clock, Zap, Activity } from 'lucide-react';
export function StatsGrid() {
  const { t } = useTranslation();
  const stats = [
    { icon: Users, label: t('stats.patient'), color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Clock, label: t('stats.clinical'), color: 'text-health-teal', bg: 'bg-teal-50' },
    { icon: Zap, label: t('stats.triage'), color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Activity, label: t('stats.growth'), color: 'text-rose-500', bg: 'bg-rose-50' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 rounded-3xl bg-white shadow-neu flex flex-col items-center text-center gap-4"
        >
          <div className={`${stat.bg} p-4 rounded-2xl shadow-neu-soft`}>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
          <p className="text-sm font-semibold text-muted-foreground px-2 leading-relaxed">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}