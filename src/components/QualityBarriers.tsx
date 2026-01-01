import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
export function QualityBarriers() {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-8 md:p-12 rounded-5xl bg-white shadow-neu border-l-8 border-health-danger overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <AlertTriangle className="h-64 w-64 text-health-danger animate-shake" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
          <div className="h-16 w-16 center rounded-2xl bg-rose-50 shadow-neu-soft shrink-0">
            <AlertTriangle className="h-8 w-8 text-health-danger" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-display font-bold text-health-dark">
              {t('barriers.title')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('barriers.desc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {['AutoRAG Architecture', 'Claude 3.5 Validation', 'VoyageAI Embeddings', 'Clinical Safety Rails'].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-health-dark">
                  <CheckCircle2 className="h-4 w-4 text-health-teal" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}