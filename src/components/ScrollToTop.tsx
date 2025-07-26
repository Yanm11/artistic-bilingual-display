import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>();
  const lastClickedArtistId = useRef<string | null>(null);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = pathname;

    // Store the artist ID when going from gallery to artist page
    if (prevPath === '/gallery' && currentPath.startsWith('/artist/')) {
      const artistId = currentPath.replace('/artist/', '');
      lastClickedArtistId.current = artistId;
    }

    // Restore position when returning from artist page to gallery
    if (prevPath?.startsWith('/artist/') && currentPath === '/gallery') {
      const artistId = lastClickedArtistId.current;
      
      if (artistId) {
        // Use a longer delay to account for gallery animations and intersection observer
        const scrollToArtist = () => {
          setTimeout(() => {
            // Find the artist card element by looking for the link with the artist ID
            const artistLink = document.querySelector(`a[href="/artist/${artistId}"]`);
            
            if (artistLink) {
              artistLink.scrollIntoView({
                behavior: 'auto',
                block: 'center'
              });
            } else {
              // Fallback: scroll to a reasonable position if element not found
              window.scrollTo(0, 400);
            }
          }, 300); // Longer delay to account for animations
        };
        
        scrollToArtist();
      } else {
        // No stored artist, scroll to top
        window.scrollTo(0, 0);
      }
    } else {
      // Scroll to top for all other navigation scenarios
      window.scrollTo(0, 0);
    }

    // Update the previous path for next navigation
    prevPathRef.current = currentPath;
  }, [pathname]);

  return null;
};

export default ScrollToTop; 