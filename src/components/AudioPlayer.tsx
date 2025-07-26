import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setIsLoaded(true); // Set loaded to true to show error state
    };

    // Try to load the audio immediately
    audio.load();

    const handleEnded = () => {
      // Loop the audio
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Handle play error silently
      });
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    // Add multiple event listeners to ensure we catch the load
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Set a timeout to force loaded state if audio takes too long
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [isLoaded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Handle play error silently
      });
    }
  };

  // Check if audio has error
  const audio = audioRef.current;
  const hasError = audio && audio.error !== null;

  if (!isLoaded) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          size="sm"
          variant="outline"
          disabled
          className="w-8 h-8 p-0 rounded-full"
        >
          <Volume2 className="h-3 w-3" />
        </Button>
        <span className="text-xs text-muted-foreground">Loading...</span>
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        size="sm"
        variant="outline"
        onClick={togglePlay}
        disabled={hasError}
        className="w-8 h-8 p-0 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        {hasError ? (
          <Volume2 className="h-3 w-3" />
        ) : isPlaying ? (
          <Pause className="h-3 w-3" />
        ) : (
          <Play className="h-3 w-3" />
        )}
      </Button>
      <span className="text-xs text-muted-foreground">
        {hasError ? 'Audio unavailable' : isPlaying ? 'Playing' : 'Click to play'}
      </span>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default AudioPlayer; 