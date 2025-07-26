import React from 'react';
import { Link } from 'react-router-dom';
import { Artist, Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  language: Language;
}

// Helper function to check if a file is a video
const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.flv', '.wmv'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, language }) => {
  const isRTL = language === 'he';

  return (
    <Link 
      to={`/artist/${artist.id}`}
      className={cn(
        "group block bg-card rounded-2xl overflow-hidden gallery-shadow artwork-hover",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
    >
      <div className="aspect-[2/2] overflow-hidden">
        {isVideoFile(artist.featuredImage) ? (
          <video
            src={artist.featuredImage}
            className="w-full h-full object-cover gallery-transition group-hover:scale-105"
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        ) : (
          <img
            src={artist.featuredImage}
            alt={artist.name[language]}
            className="w-full h-full object-cover gallery-transition group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      
      <div className={cn("p-6", isRTL && "text-right")} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Project Title - Bold and bigger */}
        <h3 className="text-xl font-gallery font-bold text-foreground mb-1">
            {artist.projectTitle[language]}
        </h3>
        
        {/* Artist Name - Same size but not bold */}
        <h4 className="text-xl font-gallery text-foreground mb-1">
          {artist.name[language]}
        </h4>
        
        
        {/* Medium - Smaller text */}
        {artist.projectMedium[language] && (
          <p className="text-base font-ui text-muted-foreground mb-4">
            {artist.projectMedium[language]}
          </p>
        )}
        
        {artist.bio[language] && artist.bio[language].trim() !== '' && (
          <p className="text-sm text-muted-foreground font-ui line-clamp-3 leading-relaxed">
            {artist.bio[language]}
          </p>
        )}
        
        <div className="mt-4 flex items-center text-sm text-primary font-ui font-medium">
          <span className="group-hover:underline">
            {language === 'en' ? 'View Works' : 'ליצירות'}
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