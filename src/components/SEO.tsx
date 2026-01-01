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
  const siteUrl = canonical || (typeof window !== 'undefined' ? window.location.origin : '');
  const siteImage = image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200';
  const currentLang = i18n.language === 'pt' ? 'pt-BR' : 'en-US';
  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Voither Healthcare AI",
    "alternateName": "Voither Ambient-Agentic Systems",
    "description": siteDescription,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "knowsAbout": [
      "Ambient Clinical Intelligence",
      "Agentic AI in Healthcare",
      "Medical Documentation Automation",
      "Emergency Triage Algorithms"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AACI Product Suite",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "MedScribe",
          "applicationCategory": "MedicalSoftware",
          "operatingSystem": "Web, iOS, Android"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Sortio Triage",
          "applicationCategory": "HealthBusinessSoftware"
        }
      ]
    }
  };
  return (
    <Helmet>
      {/* Basic Metadata */}
      <html lang={i18n.language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <link rel="canonical" href={siteUrl} />
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en-US" href={`${siteUrl}?lng=en`} />
      <link rel="alternate" hrefLang="pt-BR" href={`${siteUrl}?lng=pt`} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:locale" content={currentLang.replace('-', '_')} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
    </Helmet>
  );
}