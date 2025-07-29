import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '@/types/gallery';

interface SEOProps {
  title?: {
    en: string;
    he: string;
  };
  description?: {
    en: string;
    he: string;
  };
  keywords?: {
    en: string[];
    he: string[];
  };
  image?: string;
  url?: string;
  language: Language;
  type?: 'website' | 'article';
  artistName?: string;
  projectTitle?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  language,
  type = 'website',
  artistName,
  projectTitle,
}) => {
  const baseUrl = 'https://galleryofthesenate.netlify.app';
  const defaultImage = `${baseUrl}/banner.jpg`;
  
  // Default titles
  const defaultTitle = {
    en: 'Gallery of the Senate - Ben Gurion University Art Department',
    he: 'גלרית הסנאט - המחלקה לאומנות אוניברסיטת בן גוריון'
  };

  // Default descriptions
  const defaultDescription = {
    en: 'Graduate exhibition showcasing contemporary art works by Ben Gurion University art students. Explore paintings, installations, digital art and more.',
    he: 'תערוכת בוגרות המציגה עבודות אמנות עכשווית של סטודנטיות למחלקה לאומנות באוניברסיטת בן גוריון. גלו ציורים, מיצבים, אמנות דיגיטלית ועוד.'
  };

  // Base keywords in both languages
  const baseKeywords = {
    en: [
      'Ben Gurion University',
      'Art Department',
      'Gallery of the Senate',
      'Contemporary Art',
      'Art Exhibition',
      'Israeli Art',
      'University Gallery',
      'Graduate Exhibition',
      'Fine Arts',
      'Visual Arts'
    ],
    he: [
      'אוניברסיטת בן גוריון',
      'המחלקה לאומנות בן גוריון',
      'גלרית הסנאט',
      'תערוכות בוגרות האוניברסיטה',
      'גלריה לאומנות',
      'גלרית בן גוריון',
      'אוניברסיטת בן גוריון אומנות',
      'אמנות עכשווית',
      'תערוכת אמנות',
      'אמנות ישראלית',
      'גלריה אוניברסיטאית',
      'תערוכת בוגרים',
      'אמנות פלסטית',
      'אמנויות חזותיות'
    ]
  };

  // Combine keywords with base keywords
  const finalKeywords = {
    en: [...baseKeywords.en, ...(keywords?.en || [])],
    he: [...baseKeywords.he, ...(keywords?.he || [])]
  };

  // Add artist-specific keywords if provided
  if (artistName) {
    finalKeywords.en.push(artistName);
    finalKeywords.he.push(artistName);
  }
  
  if (projectTitle) {
    finalKeywords.en.push(projectTitle);
    finalKeywords.he.push(projectTitle);
  }

  const currentTitle = title ? title[language] : defaultTitle[language];
  const currentDescription = description ? description[language] : defaultDescription[language];
  const currentUrl = url ? `${baseUrl}${url}` : baseUrl;
  const currentImage = image ? `${baseUrl}${image}` : defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta name="keywords" content={finalKeywords[language].join(', ')} />
      <meta name="author" content="Gallery of the Senate - Ben Gurion University" />
      <meta name="language" content={language} />
      
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="Rf-DsJgVasQ7GoCCjkkrf-3d8OGiJ7ou8FgAJXi5zII" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:site_name" content={language === 'he' ? 'גלרית הסנאט' : 'Gallery of the Senate'} />
      <meta property="og:locale" content={language === 'he' ? 'he_IL' : 'en_US'} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={currentDescription} />
      <meta property="twitter:image" content={currentImage} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Hreflang for bilingual support */}
      <link rel="alternate" hrefLang="he" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
      
      {/* Structured Data for Art Gallery */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ArtGallery",
          "name": language === 'he' ? 'גלרית הסנאט' : 'Gallery of the Senate',
          "description": currentDescription,
          "url": currentUrl,
          "image": currentImage,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IL",
            "addressLocality": language === 'he' ? 'באר שבע' : 'Beer Sheva'
          },
          "parentOrganization": {
            "@type": "EducationalOrganization",
            "name": language === 'he' ? 'אוניברסיטת בן גוריון בנגב' : 'Ben Gurion University of the Negev'
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 