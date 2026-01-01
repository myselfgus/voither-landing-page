import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoLayout } from '@/components/DemoLayout';
import { SEO } from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGamificationStore } from '@/lib/gamification';
import { ClipboardCheck, ShieldAlert, Activity } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_PATIENTS = [
  { id: 1, name: "Maria S.", symptoms: "Shortness of breath, chest pressure", status: 'pending' },
  { id: 2, name: "Joao P.", symptoms: "Persistent cough, minor fever", status: 'pending' },
  { id: 3, name: "Ana L.", symptoms: "Suspected fracture, moderate pain", status: 'pending' }
];
export function SortioDemo() {
  const { t } = useTranslation();
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const addXP = useGamificationStore((s) => s.addXP);

  const triagePatient = (id: number) => {
    const triageTime = Date.now();
    setProcessingId(id);
    setTimeout(() => {
      setPatients(prev => prev.map(p => {
        if (p.id === id) {
          const priority = p.id === 1 ? 'critical' : p.id === 3 ? 'medium' : 'low';
          return { ...p, status: priority };
        }
        return p;
      }));
      setProcessingId(null);
      
      const isFast = (Date.now() - triageTime) < 5000;
      const baseXP = 20;
      const bonusXP = isFast ? 10 : 0;
      
      addXP(baseXP + bonusXP);
      toast.success(`+${baseXP + bonusXP} Clinical XP`, {
        description: isFast ? "Speed Bonus Awarded!" : "Patient prioritized correctly.",
        icon: <Activity className="h-4 w-4" />
      });
    }, 1500);
  };

  return (
    <DemoLayout title={t('suite.sortio')}>
      <SEO title={t('seo.sortio')} />
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-display font-bold text-health-dark">{t('demos.sortio.subtitle')}</h2>
          <p className="text-muted-foreground">{t('demos.sortio.desc')}</p>
        </div>
        <div className="space-y-6">
          {patients.map((patient) => (
            <motion.div
              layout
              key={patient.id}
              className="p-8 rounded-4xl bg-white shadow-neu flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-health-bg shadow-neu-inset center">
                  <Activity className="h-6 w-6 text-health-teal" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-health-dark">{patient.name}</h4>
                  <p className="text-sm text-muted-foreground">{patient.symptoms}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <AnimatePresence mode="wait">
                  {patient.status === 'pending' ? (
                    <Button
                      key="btn"
                      disabled={processingId !== null}
                      onClick={() => triagePatient(patient.id)}
                      className="rounded-full bg-health-dark text-white px-6"
                    >
                      {processingId === patient.id ? (
                        <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity }}>
                          {t('demos.sortio.analyzing')}
                        </motion.span>
                      ) : (
                        <>
                          {t('demos.sortio.analyze')} <ClipboardCheck className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-end gap-1 group">
                      <Badge className={`rounded-full px-4 py-1 uppercase text-[10px] font-bold ${
                        patient.status === 'critical' ? 'bg-health-danger text-white' :
                        patient.status === 'medium' ? 'bg-amber-500 text-white' : 'bg-health-teal text-white shadow-glow'
                      } transition-all group-hover:scale-105 shadow-soft`}>
                        {patient.status} {t('demos.sortio.priority')}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3" /> {t('demos.sortio.verified')}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DemoLayout>
  );
}