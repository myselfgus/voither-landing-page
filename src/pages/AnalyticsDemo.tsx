import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoLayout } from '@/components/DemoLayout';
import { SEO } from '@/components/SEO';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { useGamificationStore } from '@/lib/gamification';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
const DATA_EFFICIENCY = [
  { name: 'Jan', manual: 120, ai: 45 },
  { name: 'Feb', manual: 115, ai: 42 },
  { name: 'Mar', manual: 125, ai: 38 },
  { name: 'Apr', manual: 110, ai: 35 },
];
const DATA_RISK = [
  { name: 'Low', value: 400 },
  { name: 'Moderate', value: 300 },
  { name: 'High', value: 100 },
];
const COLORS = ['#00A896', '#3b82f6', '#C44536'];
export function AnalyticsDemo() {
  const { t } = useTranslation();
  const [exported, setExported] = useState(false);
  const addXP = useGamificationStore(s => s.addXP);
  const handleExport = () => {
    if (exported) return;
    setExported(true);
    addXP(40);
    toast.success("+40 Clinical XP", {
      description: t('demos.analytics.insights_exported'),
      icon: <Sparkles className="h-4 w-4 text-health-teal" />
    });
  };
  return (
    <DemoLayout title={t('suite.analytics')}>
      <SEO title={t('seo.analytics')} />
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-health-dark">{t('demos.analytics.subtitle')}</h2>
            <p className="text-muted-foreground">{t('demos.analytics.desc')}</p>
          </div>
          <div className="relative group">
            <AnimatePresence>
              {!exported && (
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 h-4 w-4 bg-health-teal rounded-full animate-pulse-soft z-10"
                />
              )}
            </AnimatePresence>
            <Button 
              disabled={exported}
              onClick={handleExport}
              className="rounded-full bg-health-teal text-white shadow-lg shadow-health-teal/20 active:shadow-neu-active transition-all"
            >
              <Download className="mr-2 h-4 w-4" /> {t('demos.analytics.export')}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-4xl bg-white shadow-neu space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-health-dark flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-health-teal" /> {t('demos.analytics.efficiency')}
              </h3>
              <span className="text-[10px] font-bold bg-teal-50 text-health-teal px-2 py-1 rounded">68% Improvement</span>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_EFFICIENCY}>
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    cursor={{ fill: 'rgba(0,168,150,0.05)' }}
                  />
                  <Bar dataKey="manual" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Manual" />
                  <Bar dataKey="ai" fill="#00A896" radius={[4, 4, 0, 0]} name="Voither AI" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-8 rounded-4xl bg-white shadow-neu flex flex-col items-center justify-center space-y-4">
            <h3 className="font-bold text-health-dark">{t('demos.analytics.risk')}</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={DATA_RISK} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {DATA_RISK.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4">
              {DATA_RISK.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 rounded-4xl bg-health-bg shadow-neu-inset border border-white">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-white shadow-neu-soft center shrink-0">
              <ShieldCheck className="h-5 w-5 text-health-teal" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-health-dark">AI Agent Insight</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('demos.analytics.insight')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}