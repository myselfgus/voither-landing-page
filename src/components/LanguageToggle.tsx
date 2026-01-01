import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
export function LanguageToggle() {
  const { i18n } = useTranslation();
  const toggle = () => {
    const next = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(next);
    localStorage.setItem('lng', next);
  };
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggle}
      className="flex items-center gap-2 text-health-dark hover:bg-health-teal/10 rounded-full px-4 shadow-neu-soft transition-all"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold uppercase text-xs">{i18n.language}</span>
    </Button>
  );
}