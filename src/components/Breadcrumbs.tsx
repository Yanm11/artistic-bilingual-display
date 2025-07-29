import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Language } from '@/types/gallery';
import { artistsData } from '@/data/artists';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  language: Language;
  customItems?: Array<{
    label: { en: string; he: string };
    path?: string;
    isHome?: boolean;
  }>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ language, customItems }) => {
  const location = useLocation();
  const isRTL = language === 'he';
  
  // Default labels
  const labels = {
    home: { en: 'Home', he: 'בית' },
    gallery: { en: 'Gallery', he: 'גלריה' },
    artist: { en: 'Artist', he: 'אמנית' }
  };

  // Build breadcrumb items based on current path
  const buildBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs = [
      {
        label: labels.home,
        path: '/',
        isHome: true
      }
    ];

    // Handle different routes
    if (pathSegments.length === 0) {
      // Home page - only show home
      return breadcrumbs;
    }

    if (pathSegments[0] === 'gallery') {
      breadcrumbs.push({
        label: labels.gallery,
        path: '/gallery',
        isHome: false
      });
    }

    if (pathSegments[0] === 'artist' && pathSegments[1]) {
      // Add gallery as parent for artist pages
      breadcrumbs.push({
        label: labels.gallery,
        path: '/gallery',
        isHome: false
      });

      // Find artist data
      const artistId = pathSegments[1];
      const artist = artistsData.find(a => a.id === artistId);
      
      if (artist) {
        breadcrumbs.push({
          label: artist.name,
          path: `/artist/${artistId}`,
          isHome: false
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbItems = customItems || buildBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs on home page only
  }

  return (
    <nav 
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground mb-6", isRTL && "space-x-reverse")} 
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={language === 'en' ? 'Breadcrumb navigation' : 'ניווט נתיב'}
    >
      <div className="flex items-center">
        {breadcrumbItems.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className={cn("h-4 w-4 mx-1", isRTL && "rotate-180")} 
                aria-hidden="true" 
              />
            )}
            
            <div className="flex items-center">
              {item.isHome && (
                <Home className={cn("h-4 w-4", isRTL ? "ml-1" : "mr-1")} aria-hidden="true" />
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                // Current page - not clickable
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label[language]}
                </span>
              ) : (
                // Parent pages - clickable
                <Link
                  to={item.path || '#'}
                  className="hover:text-foreground transition-colors duration-200"
                  aria-label={`${language === 'en' ? 'Go to' : 'עבור אל'} ${item.label[language]}`}
                >
                  {item.label[language]}
                </Link>
              )}
            </div>
          </span>
        ))}
      </div>
      
      {/* Structured data for breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label[language],
            "item": item.path ? `https://galleryofthesenate.netlify.app${item.path}` : undefined
          }))
        })}
      </script>
    </nav>
  );
};

export default Breadcrumbs; 