import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@/types/gallery';

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navigation: React.FC<NavigationProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const mobileLanguageMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageMenuRef.current && 
        !languageMenuRef.current.contains(event.target as Node) &&
        mobileLanguageMenuRef.current && 
        !mobileLanguageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isRTL = language === 'he';

  const navigationItems = [
    {
      href: '/',
      label: {
        en: 'About',
        he: 'אודות'
      }
    },
    {
      href: '/gallery',
      label: {
        en: 'Gallery',
        he: 'גלריה'
      }
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b gallery-shadow",
        isRTL && "rtl"
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-3 text-xl font-gallery font-semibold text-foreground gallery-transition hover:text-accent",
              isRTL && "text-right"
            )}
          >
            {/* Conditionally render logo and text based on language direction */}
            {isRTL ? (
              <>
                <img 
                  src="/logo.png" 
                  alt="Gallery Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="text-right">גלרית הסנאט</span>
              </>
            ) : (
              <>
                <img 
                  src="/logo.png" 
                  alt="Gallery Logo" 
                  className="h-8 w-8 object-contain"
                />
                <span>Gallery of the Senate</span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden md:flex items-center",
            isRTL ? "space-x-reverse space-x-8" : "space-x-8"
          )}>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-ui font-medium gallery-transition relative px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105",
                  isActive(item.href) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/20",
                  "after:content-[''] after:absolute after:w-full after:h-0.5 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300",
                  isActive(item.href) 
                    ? "after:bg-primary after:scale-x-100" 
                    : "after:bg-primary after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {item.label[language]}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <div className="relative" ref={languageMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/20 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-transparent hover:border-accent/30 group"
                aria-label="Change language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
              >
                <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'EN' : 'עב'}
                </span>
              </Button>
              
              {/* Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-1 z-50">
                  <div className="bg-popover border rounded-md shadow-lg py-1 min-w-[80px] backdrop-blur-sm">
                    <button
                      onClick={() => {
                        onLanguageChange('en');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left transition-all duration-300 hover:bg-accent/20 hover:shadow-sm hover:scale-105 transform ${
                        language === 'en' ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Switch to English"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        onLanguageChange('he');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-sm text-left transition-all duration-300 hover:bg-accent/20 hover:shadow-sm hover:scale-105 transform ${
                        language === 'he' ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Switch to Hebrew"
                    >
                      עב
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative" ref={mobileLanguageMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-1 hover:bg-accent/20 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-transparent hover:border-accent/30 group"
                aria-label="Change language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
              >
                <Globe className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-xs">
                  {language === 'en' ? 'EN' : 'עב'}
                </span>
              </Button>
              
              {/* Mobile Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-1 z-50">
                  <div className="bg-popover border rounded-md shadow-lg py-1 min-w-[60px] backdrop-blur-sm">
                    <button
                      onClick={() => {
                        onLanguageChange('en');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full px-2 py-1 text-xs text-left transition-all duration-300 hover:bg-accent/20 hover:shadow-sm hover:scale-105 transform ${
                        language === 'en' ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Switch to English"
                    >
                      EN
                    </button>
                    <button
                      onClick={() => {
                        onLanguageChange('he');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full px-2 py-1 text-xs text-left transition-all duration-300 hover:bg-accent/20 hover:shadow-sm hover:scale-105 transform ${
                        language === 'he' ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                      aria-label="Switch to Hebrew"
                    >
                      עב
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:bg-accent/20 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-transparent hover:border-accent/30 group"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block text-base font-ui font-medium gallery-transition py-2 rounded-md px-3 hover:bg-accent/20 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 border border-transparent hover:border-accent/30",
                  isActive(item.href) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label[language]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;