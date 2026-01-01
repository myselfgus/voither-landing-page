import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Send } from 'lucide-react';
export function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 md:p-12 rounded-5xl bg-white shadow-neu border border-white/50 space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-display font-bold text-health-dark">
                  {t('contact.title')}
                </h2>
                <p className="text-muted-foreground">
                  {t('contact.subtitle')}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input 
                    required 
                    placeholder={t('contact.name')} 
                    className="h-14 rounded-2xl shadow-neu-inset border-none bg-health-bg px-6" 
                  />
                  <Input 
                    required 
                    placeholder={t('contact.org')} 
                    className="h-14 rounded-2xl shadow-neu-inset border-none bg-health-bg px-6" 
                  />
                  <Input 
                    required 
                    type="email" 
                    placeholder={t('contact.email')} 
                    className="h-14 rounded-2xl shadow-neu-inset border-none bg-health-bg px-6" 
                  />
                </div>
                <Button 
                  disabled={loading}
                  type="submit" 
                  className="w-full h-14 bg-health-teal hover:bg-health-teal/90 text-white rounded-2xl text-lg font-bold shadow-lg shadow-health-teal/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {loading ? t('contact.sending') : (
                    <>
                      {t('contact.submit')} <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 rounded-5xl bg-white shadow-neu border border-white/50 text-center space-y-6"
            >
              <div className="h-20 w-20 bg-teal-50 rounded-3xl shadow-neu-soft center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-health-teal" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-health-dark">
                  {t('contact.successTitle')}
                </h3>
                <p className="text-muted-foreground">
                  {t('contact.successMessage')}
                </p>
              </div>
              <Button 
                onClick={() => setSubmitted(false)}
                variant="ghost" 
                className="text-health-teal font-bold"
              >
                {t('contact.back')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}