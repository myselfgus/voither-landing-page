import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className={`
          relative transition-all duration-500 rounded-[2rem] px-8 py-5 flex items-center justify-between border 
          ${isScrolled 
            ? 'bg-white/60 backdrop-blur-2xl shadow-xl border-white/40 scale-[0.98]' 
            : 'bg-white/10 backdrop-blur-md shadow-neu-soft border-white/20'
          }
        `}>
          <div className="flex items-center gap-2">
            <a href="/" className="text-3xl font-display font-bold text-health-dark tracking-tighter hover:opacity-80 transition-opacity">
              VOITHER
            </a>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-10 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
              <a href="#engine" className="hover:text-health-teal transition-colors">{t('nav.features')}</a>
              <a href="#suite" className="hover:text-health-teal transition-colors">{t('nav.products')}</a>
              <a href="#contact" className="hover:text-health-teal transition-colors">Contact</a>
            </div>
            <div className="h-6 w-px bg-muted/20" />
            <div className="flex items-center gap-5">
              <LanguageToggle />
              <Button className="bg-health-teal hover:bg-health-teal/90 text-white rounded-2xl px-8 py-6 font-bold shadow-lg shadow-health-teal/20 transition-all hover:scale-105 active:scale-95 border-b-4 border-black/10">
                {t('nav.start')}
              </Button>
            </div>
          </div>
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/40 backdrop-blur-md shadow-neu-soft border border-white/40"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 left-4 right-4 bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 shadow-2xl border border-white/40 z-[101] md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <a 
                href="#engine" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-health-dark"
              >
                {t('nav.features')}
              </a>
              <a 
                href="#suite" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-health-dark"
              >
                {t('nav.products')}
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-health-dark"
              >
                Contact
              </a>
              <div className="h-px w-full bg-muted/10" />
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <LanguageToggle />
                </div>
                <Button className="bg-health-teal text-white rounded-2xl py-8 text-xl font-bold shadow-lg shadow-health-teal/20">
                  {t('nav.start')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}