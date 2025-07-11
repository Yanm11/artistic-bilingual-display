import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtworkModal from '@/components/ArtworkModal';
import { artistsData } from '@/data/artists';
import { Artwork, Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtistPageProps {
  language: Language;
}

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
          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link to="/gallery">
              {isRTL ? 
                <ArrowRight className="h-4 w-4" /> : 
                <ArrowLeft className="h-4 w-4" />
              }
              {currentContent.backToGallery}
            </Link>
          </Button>
        </div>

        {/* Artist Header */}
        <div className={cn("mb-16", isRTL && "text-right")}>
          <h1 className="text-4xl md:text-5xl font-gallery font-semibold text-foreground mb-6 animate-fade-in-up">
            {artist.name[language]}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Artist Image */}
            <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-[3/4] overflow-hidden rounded-sm gallery-shadow">
                <img
                  src={artist.featuredImage}
                  alt={artist.name[language]}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Artist Info */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <p className="text-lg text-muted-foreground font-ui leading-relaxed">
                  {artist.bio[language]}
                </p>
              </div>

              {artist.statement && (
                <div>
                  <h2 className="text-2xl font-gallery font-semibold text-foreground mb-4">
                    {currentContent.statement}
                  </h2>
                  <p className="text-muted-foreground font-ui leading-relaxed italic">
                    "{artist.statement[language]}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Artworks Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className={cn(
            "text-3xl font-gallery font-semibold text-foreground mb-12",
            isRTL && "text-right"
          )}>
            {currentContent.artworks}
          </h2>

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
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title[language]}
                        className="w-full h-full object-cover gallery-transition group-hover:scale-105"
                      />
                    </div>
                    
                    <div className={cn("p-6", isRTL && "text-right")}>
                      <h3 className="text-lg font-gallery font-semibold text-foreground mb-2">
                        {artwork.title[language]}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-2 font-ui">
                        {artwork.year} • {artwork.medium[language]}
                      </p>
                      
                      {artwork.price && (
                        <p className="text-primary font-ui font-semibold">
                          {artwork.price}
                        </p>
                      )}
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