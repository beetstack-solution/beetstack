import React from 'react';

export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Beetstack IT Solutions",
    "url": "https://beetstack.it",
    "logo": "https://beetstack.it/logo.webp",
    "sameAs": [
      "https://twitter.com/beetstack",
      "https://linkedin.com/company/beetstack",
      "https://github.com/beetstack"
    ],
    "description": "Architecting the next generation of scalable, enterprise-grade software. Monorepo-first solutions built with precision and the Beetroot-inspired design philosophy.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kannur",
      "addressRegion": "Kerala",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": "+91 999 000 0000",
      "email": "hello@beetstack.it"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
