import React from 'react';
import { Link } from 'react-router-dom';
import { Artist, Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  language: Language;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, language }) => {
  const isRTL = language === 'he';

  return (
    <Link 
      to={`/artist/${artist.id}`}
      className={cn(
        "group block bg-card rounded-sm overflow-hidden gallery-shadow artwork-hover",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={artist.featuredImage}
          alt={artist.name[language]}
          className="w-full h-full object-cover gallery-transition group-hover:scale-105"
        />
      </div>
      
      <div className={cn("p-6", isRTL && "text-right")} dir={isRTL ? 'rtl' : 'ltr'}>
        <h3 className="text-lg font-gallery font-semibold text-foreground mb-2">
          {artist.name[language]}
        </h3>
        
        <p className="text-sm text-muted-foreground font-ui line-clamp-3 leading-relaxed">
          {artist.bio[language]}
        </p>
        
        <div className="mt-4 flex items-center text-sm text-primary font-ui font-medium">
          <span className="group-hover:underline">
            {language === 'en' ? 'View Works' : 'צפה ביצירות'}
          </span>
          <span className={cn(
            "ml-2 gallery-transition group-hover:translate-x-1",
            isRTL && "ml-0 mr-2 group-hover:translate-x-0 group-hover:-translate-x-1"
          )}>
            {isRTL ? '←' : '→'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;