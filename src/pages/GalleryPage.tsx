import React, { useEffect, useRef, useState } from 'react';
import ArtistCard from '@/components/ArtistCard';
import { artistsData } from '@/data/artists';
import { Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface GalleryPageProps {
  language: Language;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ language }) => {
  const isRTL = language === 'he';
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const content = {
    en: {
      title: 'Course Graduates Artwork',
      noArtists: 'No artists found'
    },
    he: {
      title: 'היצירות של בוגרות הקורס',
      noArtists: 'לא נמצאו אמנים'
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className={cn("min-h-screen pt-24 pb-16", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Artists Grid */}
        {artistsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistsData.map((artist, index) => (
              <div 
                key={artist.id} 
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={cn(
                  "transition-all duration-1000 ease-out transform",
                  visibleCards.has(index) 
                    ? "opacity-100 translate-y-[-4px]" 
                    : "opacity-0 translate-y-8"
                )}
              >
                <ArtistCard artist={artist} language={language} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-ui text-lg">
              {currentContent.noArtists}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;