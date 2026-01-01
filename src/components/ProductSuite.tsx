import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileText, ClipboardList, Cloud, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
export function ProductSuite() {
  const { t } = useTranslation();
  const products = [
    { name: t('suite.medscribe'), icon: FileText, tag: 'Documentation', href: '/medscribe' },
    { name: t('suite.sortio'), icon: ClipboardList, tag: 'Triage', href: '/sortio' },
    { name: t('suite.clinic'), icon: Cloud, tag: 'Platform', href: '/cloudclinic' },
    { name: t('suite.analytics'), icon: BarChart3, tag: 'Intelligence', href: '/analytics' }
  ];
  return (
    <div id="suite" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, i) => (
        <Link 
          key={i} 
          to={product.href}
          className="group p-8 rounded-4xl bg-white shadow-neu flex flex-col gap-6 transition-all hover:scale-[1.02] hover:shadow-neu-soft"
        >
          <div className="flex justify-between items-start">
            <div className="h-14 w-14 center rounded-2xl bg-white shadow-neu-soft group-hover:shadow-neu-inset transition-shadow">
              <product.icon className="h-7 w-7 text-health-teal" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-3 py-1 rounded-full">
              {product.tag}
            </span>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-health-dark flex items-center gap-2">
              {product.name}
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </h4>
          </div>
        </Link>
      ))}
    </div>
  );
}