import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface DemoLayoutProps {
  children: React.ReactNode;
  title: string;
}
export function DemoLayout({ children, title }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-health-bg font-sans selection:bg-health-teal/30">
      <nav className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-neu-soft px-6 py-3 flex items-center justify-between border border-white/40">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-full shadow-neu-soft hover:shadow-neu-inset">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-display font-bold text-health-dark">
                {title} <span className="text-health-teal text-xs ml-2 font-mono uppercase tracking-tighter">Demo</span>
              </h1>
            </div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">
              AACI Engine Simulation
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pb-20">
        {children}
      </main>
    </div>
  );
}