import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
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

// Helper function to check if a file is a video
const isVideoFile = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.flv', '.wmv'];
  return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

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
        className="max-w-6xl w-full h-[79vh] p-0 gap-0 md:h-[87vh] !top-[10vh] !translate-y-0 max-h-[95vh]"
      >
        <DialogTitle className="sr-only">
          {artwork.title[language]}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {artwork.title[language]} - {artwork.medium[language]}
        </DialogDescription>
        <div className="relative w-full h-full flex flex-col md:flex-row overflow-hidden">
          {/* Close button - positioned to avoid overlap */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col md:flex-row w-full h-full">
            {/* Media section - takes full height on mobile, flex-1 on desktop */}
            <div className="relative flex-1 bg-muted flex items-center justify-center p-4 md:p-8 min-h-0">
              {/* Desktop navigation buttons - positioned on image edges */}
              {hasPrevious && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPrevious?.();
                  }}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white hover:text-white border border-white/20 hover:border-white/40 hidden md:flex transition-all duration-200",
                    isRTL ? "right-2" : "left-2"
                  )}
                >
                  {isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              )}

              {hasNext && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNext?.();
                  }}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white hover:text-white border border-white/20 hover:border-white/40 hidden md:flex transition-all duration-200",
                    isRTL ? "left-2" : "right-2"
                  )}
                >
                  {isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}

              {isVideoFile(artwork.imageUrl) ? (
                <video
                  src={artwork.imageUrl}
                  controls
                  className="max-w-full max-h-full object-contain gallery-shadow-strong"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[language]}
                  className="max-w-full max-h-full object-contain gallery-shadow-strong"
                  loading="eager"
                  decoding="async"
                />
              )}
            </div>

            {/* Information panel - full width on mobile, fixed width on desktop */}
            <div className={cn(
              "bg-background p-4 md:p-6 overflow-y-auto md:w-48 w-full flex items-center justify-center",
              isRTL && "text-right"
            )} dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="space-y-4 md:space-y-6 w-full flex flex-col justify-center min-h-full pb-12 md:pb-4">
                {/* Only show title if it exists */}
                {artwork.title[language] && artwork.title[language].trim() !== '' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-gallery font-semibold text-foreground mb-2">
                      {artwork.title[language]}
                    </h2>
                  </div>
                )}
                
                
                {/* Only show external link if it exists */}
                {artwork.externalLink && (
                  <div>
                    <a
                      href={artwork.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-ui text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                    >
                      {artwork.externalLink.text[language]}
                    </a>
                  </div>
                )}
                
                {/* Only show medium if it exists */}
                {artwork.medium[language] && artwork.medium[language].trim() !== '' && (
                  <div>
                    <p className="text-sm text-muted-foreground font-ui">
                      {artwork.medium[language]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile navigation buttons - positioned with bottom padding */}
          <div className="md:hidden flex justify-between items-center absolute bottom-8 left-4 right-4 z-10">
            {isRTL ? (
              <>
                {hasNext && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNext?.();
                    }}
                    className="bg-background/80 backdrop-blur-sm hover:bg-black/40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                {hasPrevious && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPrevious?.();
                    }}
                    className="bg-background/80 backdrop-blur-sm hover:bg-black/40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <>
                {hasPrevious && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPrevious?.();
                    }}
                    className="bg-background/80 backdrop-blur-sm hover:bg-black/40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                {hasNext && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNext?.();
                    }}
                    className="bg-background/80 backdrop-blur-sm hover:bg-black/40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;