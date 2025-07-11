import React from 'react';
import { Language } from '@/types/gallery';
import galleryBanner from '@/assets/gallery-banner.png';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const isRTL = language === 'he';
  
  return (
    <footer 
      className={`bg-background border-t mt-16 ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Gallery Banner */}
          <div className="w-full max-w-2xl">
            <img 
              src={galleryBanner} 
              alt={language === 'en' 
                ? 'The Department of the Arts - Ben-Gurion University of the Negev' 
                : 'המחלקה לאמנויות - אוניברסיטת בן-גוריון בנגב'
              }
              className="w-full h-auto"
            />
          </div>
          
          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? '© 2024 Gallery Lumina. All rights reserved.' 
                : '© 2024 גלריה לומינה. כל הזכויות שמורות.'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Department of the Arts - Ben-Gurion University of the Negev' 
                : 'המחלקה לאמנויות - אוניברסיטת בן-גוריון בנגב'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;