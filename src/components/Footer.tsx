import React from 'react';
import { Language } from '@/types/gallery';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const isRTL = language === 'he';
  
  return (
    <footer 
      className={`bg-background bg-white border-t mt-16 ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Gallery Banner */}
          <div className="w-full max-w-4xl">
            <img 
              src="/banner.jpg" 
              alt={language === 'en' 
                ? 'The Department of the Arts - Ben-Gurion University of the Negev' 
                : 'המחלקה לאמנויות - אוניברסיטת בן-גוריון בנגב'
              }
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          {/* Footer Text */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? '© 2025 Gallery of the Senate. All rights reserved.' 
                : '© 2025 גלרית הסנאט. כל הזכויות שמורות.'
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