import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtworkModal from '@/components/ArtworkModal';
import AudioPlayer from '@/components/AudioPlayer';
import { artistsData } from '@/data/artists';
import { Artwork, Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtistPageProps {
  language: Language;
}

// Helper function to check if a file is a video
const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.flv', '.wmv'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const ArtistPage: React.FC<ArtistPageProps> = ({ language }) => {
  const { artistId } = useParams<{ artistId: string }>();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  
  const isRTL = language === 'he';
  
  const artist = artistsData.find(a => a.id === artistId);

  if (!artist) {
    return (
      <div className={cn("min-h-screen pt-24 flex items-center justify-center", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={cn("text-center", isRTL && "text-right")}>
          <h1 className="text-2xl font-gallery font-semibold text-foreground mb-4">
            {language === 'en' ? 'Artist Not Found' : 'אמן לא נמצא'}
          </h1>
          <p className="text-muted-foreground mb-6 font-ui">
            {language === 'en' ? 'The artist you are looking for does not exist.' : 'האמן שאתם מחפשים לא קיים.'}
          </p>
          <Button asChild>
            <Link to="/gallery">
              {language === 'en' ? 'Back to Gallery' : 'חזרה לגלריה'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const openArtwork = (artwork: Artwork, index: number) => {
    setSelectedArtwork(artwork);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    setSelectedIndex(-1);
  };

  const navigateToNext = () => {
    if (selectedIndex < artist.artworks.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedArtwork(artist.artworks[nextIndex]);
      setSelectedIndex(nextIndex);
    }
  };

  const navigateToPrevious = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedArtwork(artist.artworks[prevIndex]);
      setSelectedIndex(prevIndex);
    }
  };

  const content = {
    en: {
      backToGallery: 'Back to Gallery',
      artworks: 'Artworks',
      statement: 'Artist Statement',
      noStatement: 'No artist statement available',
      noArtworks: 'No artworks available for this artist'
    },
    he: {
      backToGallery: 'חזרה לגלריה',
      artworks: 'יצירות',
      statement: 'הצהרת האמן',
      noStatement: 'אין הצהרת אמן זמינה',
      noArtworks: 'אין יצירות זמינות עבור אמן זה'
    }
  };

  const currentContent = content[language];

  return (
    <div className={cn("min-h-screen pt-24 pb-16", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            asChild 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/20 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-transparent hover:border-accent/30 group w-fit"
          >
            <Link to="/gallery">
              {isRTL ? 
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /> : 
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              }
              {currentContent.backToGallery}
            </Link>
          </Button>
        </div>

        {/* Artist Header */}
        <div className={cn("mb-16", isRTL && "text-right")}>
          <div className="mb-6 animate-fade-in-up">
            {/* Project Title - Bold and bigger */}
            <h1 className="text-4xl md:text-5xl font-gallery font-bold text-foreground mb-2 ">
              {artist.projectTitle[language]}
            </h1>
            
            {/* Artist Name - Same size but not bold */}
            {artist.projectTitle[language] && artist.projectTitle[language].trim() !== '' && (
              <h2 className="text-4xl md:text-5xl font-gallery text-foreground mb-2">
                {artist.name[language]}
              </h2>
            )}
            
            {/* Medium - Smaller text */}
            {artist.projectMedium[language] && (
              <p className="text-xl md:text-2xl font-ui text-muted-foreground whitespace-pre-line">
                {artist.projectMedium[language]}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           

            {/* Artist Info */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {artist.statement && artist.statement[language] && artist.statement[language].trim() !== '' && (
                <div className={cn("flex items-start gap-4", "flex-row")}>
                  <div className="flex-1">
                    <p className="text-muted-foreground font-ui leading-relaxed italic">
                      "{artist.statement[language]}" {artist.name[language]}
                    </p>
                  </div>
                  {artist.audio && (
                    <div className="flex-shrink-0">
                      <AudioPlayer audioUrl={artist.audio} />
                    </div>
                  )}
                </div>
              )}
              
              {artist.secondStatement && artist.secondStatement[language] && artist.secondStatement[language].trim() !== '' && (
                <div>
                  <p className="text-muted-foreground font-ui leading-relaxed">
                    {artist.secondStatement[language]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Artworks Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* <h2 className={cn(
            "text-3xl font-gallery font-semibold text-foreground mb-12",
            isRTL && "text-right"
          )}>
            {currentContent.artworks}
          </h2> */}

          {artist.artworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artist.artworks.map((artwork, index) => (
                <div 
                  key={artwork.id}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  onClick={() => openArtwork(artwork, index)}
                >
                  <div className="bg-card rounded-sm overflow-hidden gallery-shadow artwork-hover">
                    <div className="aspect-[4/5] overflow-hidden">
                      {isVideoFile(artwork.imageUrl) ? (
                        <video
                          src={artwork.imageUrl}
                          className="w-full h-full object-cover gallery-transition group-hover:scale-105"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => e.currentTarget.pause()}
                        />
                      ) : (
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title[language]}
                          className="w-full h-full object-cover gallery-transition group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                    
                    <div className={cn("p-6", isRTL && "text-right")}>
                      <h3 className="text-lg font-gallery font-semibold text-foreground mb-2">
                        {artwork.title[language]}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-2 font-ui">
                         {artwork.medium[language]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-ui text-lg">
                {currentContent.noArtworks}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Artwork Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={closeModal}
        onNext={navigateToNext}
        onPrevious={navigateToPrevious}
        hasNext={selectedIndex < artist.artworks.length - 1}
        hasPrevious={selectedIndex > 0}
        language={language}
      />
    </div>
  );
};

export default ArtistPage;