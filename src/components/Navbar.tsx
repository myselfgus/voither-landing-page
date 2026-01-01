import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/button';
export function Navbar() {
  const { t } = useTranslation();
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-neu-soft px-6 py-4 flex items-center justify-between border border-white/40">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-health-dark tracking-tight">
              VOITHER
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#engine" className="hover:text-health-teal transition-colors">{t('nav.features')}</a>
              <a href="#suite" className="hover:text-health-teal transition-colors">{t('nav.products')}</a>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button className="bg-health-teal hover:bg-health-teal/90 text-white rounded-full px-6 shadow-lg shadow-health-teal/20 transition-transform hover:scale-105 active:scale-95">
                {t('nav.start')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}