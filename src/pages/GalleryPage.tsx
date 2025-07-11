import React from 'react';
import ArtistCard from '@/components/ArtistCard';
import { artistsData } from '@/data/artists';
import { Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface GalleryPageProps {
  language: Language;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ language }) => {
  const isRTL = language === 'he';

  const content = {
    en: {
      title: 'Our Artists',
      subtitle: 'Discover the talented artists featured in our collection',
      noArtists: 'No artists found'
    },
    he: {
      title: 'האמנים שלנו',
      subtitle: 'גלו את האמנים המוכשרים המוצגים באוסף שלנו',
      noArtists: 'לא נמצאו אמנים'
    }
  };

  const currentContent = content[language];

  return (
    <div className={cn("min-h-screen pt-24 pb-16", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("text-center mb-16", isRTL && "text-right")}>
          <h1 className="text-4xl md:text-5xl font-gallery font-semibold text-foreground mb-6 animate-fade-in-up">
            {currentContent.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-ui animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {currentContent.subtitle}
          </p>
        </div>

        {/* Artists Grid */}
        {artistsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {artistsData.map((artist, index) => (
              <div 
                key={artist.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
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