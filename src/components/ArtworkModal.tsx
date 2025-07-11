import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Artwork, Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  language: Language;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  language,
  hasNext = false,
  hasPrevious = false,
}) => {
  const isRTL = language === 'he';

  if (!artwork) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-6xl w-full h-[90vh] p-0 gap-0"
      >
        <div className="relative w-full h-full flex">
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90",
                isRTL ? "right-4" : "left-4"
              )}
            >
              {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}

          {hasNext && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90",
                isRTL ? "left-4" : "right-4"
              )}
            >
              {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}

          <div className="flex w-full h-full">
            {/* Image section */}
            <div className="flex-1 bg-muted flex items-center justify-center p-8">
              <img
                src={artwork.imageUrl}
                alt={artwork.title[language]}
                className="max-w-full max-h-full object-contain gallery-shadow-strong"
              />
            </div>

            {/* Information panel */}
            <div className={cn(
              "w-96 bg-background p-8 overflow-y-auto",
              isRTL && "text-right"
            )} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-gallery font-semibold text-foreground mb-2">
                    {artwork.title[language]}
                  </h2>
                  <p className="text-lg text-muted-foreground font-ui">
                    {artwork.year}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-ui font-semibold text-foreground mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Medium' : 'חומר'}
                  </h3>
                  <p className="text-sm text-muted-foreground font-ui">
                    {artwork.medium[language]}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-ui font-semibold text-foreground mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Dimensions' : 'מידות'}
                  </h3>
                  <p className="text-sm text-muted-foreground font-ui">
                    {artwork.dimensions}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-ui font-semibold text-foreground mb-2 uppercase tracking-wider">
                    {language === 'en' ? 'Description' : 'תיאור'}
                  </h3>
                  <p className="text-sm text-muted-foreground font-ui leading-relaxed">
                    {artwork.description[language]}
                  </p>
                </div>

                {artwork.price && (
                  <div>
                    <h3 className="text-sm font-ui font-semibold text-foreground mb-2 uppercase tracking-wider">
                      {language === 'en' ? 'Price' : 'מחיר'}
                    </h3>
                    <p className="text-lg font-ui font-semibold text-primary">
                      {artwork.price}
                    </p>
                    {artwork.isAvailable !== false && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === 'en' ? 'Available for purchase' : 'זמין לרכישה'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;