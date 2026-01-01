import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore, getRank } from '@/lib/gamification';
import { Progress } from '@/components/ui/progress';
import { Activity, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function DemoProgress() {
  const { t } = useTranslation();
  const xp = useGamificationStore((s) => s.xp);
  const level = useGamificationStore((s) => s.level);
  const [prevXP, setPrevXP] = useState(xp);
  const [showXPPop, setShowXPPop] = useState(false);
  const [lastDiff, setLastDiff] = useState(0);
  const rank = getRank(level);
  // Progress within current level
  const thresholds = [0, 100, 300, 600, 1000, 2000];
  const currentThreshold = thresholds[level - 1] || 0;
  const nextThreshold = thresholds[level] || thresholds[thresholds.length - 1];
  const progress = ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  useEffect(() => {
    if (xp > prevXP) {
      setLastDiff(xp - prevXP);
      setShowXPPop(true);
      const timer = setTimeout(() => setShowXPPop(false), 2000);
      setPrevXP(xp);
      return () => clearTimeout(timer);
    }
  }, [xp, prevXP]);
  return (
    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-neu-soft border border-white/60">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-tighter text-health-teal">
            {t(`gamification.titles.${rank.toLowerCase().replace(/\s/g, '_')}`)}
          </span>
          <Activity className="h-3 w-3 text-health-teal" />
        </div>
        <div className="w-24 h-1.5 mt-1">
          <Progress value={progress} className="h-full bg-health-bg" />
        </div>
      </div>
      <div className="relative h-10 w-10 center rounded-xl bg-white shadow-neu-soft border border-white">
        <Trophy className="h-5 w-5 text-health-teal" />
        <AnimatePresence>
          {showXPPop && (
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -30, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute text-xs font-black text-health-teal bg-white rounded-full px-2 py-1 shadow-lg border border-health-teal/20"
            >
              +{lastDiff} XP
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}