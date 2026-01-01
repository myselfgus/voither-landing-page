import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type ClinicalRank = 'Intern' | 'Resident' | 'Specialist' | 'Attending' | 'Chief Medical Officer';
interface GamificationState {
  xp: number;
  level: number;
  badges: string[];
  addXP: (amount: number) => void;
  resetProgress: () => void;
}
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 2000];
export const getRank = (level: number): ClinicalRank => {
  if (level >= 5) return 'Chief Medical Officer';
  if (level === 4) return 'Attending';
  if (level === 3) return 'Specialist';
  if (level === 2) return 'Resident';
  return 'Intern';
};
export const useGamificationStore = create<GamificationState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      badges: [],
      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount;
          let newLevel = state.level;
          // Check for level up
          for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (newXP >= LEVEL_THRESHOLDS[i]) {
              newLevel = i + 1;
              break;
            }
          }
          return { xp: newXP, level: newLevel };
        }),
      resetProgress: () => set({ xp: 0, level: 1, badges: [] }),
    }),
    {
      name: 'voither-gamification',
    }
  )
);