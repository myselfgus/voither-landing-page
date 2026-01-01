import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}
export function SEO({ title, description, canonical, image }: SEOProps) {
  const { t, i18n } = useTranslation();
  const siteTitle = title ? `${title} | Voither` : t('seo.defaultTitle');
  const siteDescription = description || t('seo.defaultDescription');
  const siteUrl = canonical || window.location.origin;
  const siteImage = image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200';
  const currentLang = i18n.language === 'pt' ? 'pt-BR' : 'en-US';
  const alternateLang = i18n.language === 'pt' ? 'en-US' : 'pt-BR';
  const alternatePath = i18n.language === 'pt' ? 'en' : 'pt';
  return (
    <Helmet>
      {/* Basic Metadata */}
      <html lang={i18n.language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={siteUrl} />
      {/* Language Alternates */}
      <link rel="alternate" hrefLang={currentLang} href={siteUrl} />
      <link rel="alternate" hrefLang={alternateLang} href={`${siteUrl}?lng=${alternatePath}`} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
}