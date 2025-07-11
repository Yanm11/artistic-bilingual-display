import React, { useState } from 'react';
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
  const location = useLocation();

  const isRTL = language === 'he';

  const navigationItems = [
    {
      href: '/',
      label: {
        en: 'Home',
        he: 'בית'
      }
    },
    {
      href: '/gallery',
      label: {
        en: 'Gallery',
        he: 'גלריה'
      }
    },
    {
      href: '/about',
      label: {
        en: 'About',
        he: 'אודות'
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
            className="text-xl font-gallery font-semibold text-foreground gallery-transition hover:text-accent"
          >
            {language === 'en' ? 'Gallery Lumina' : 'גלריה לומינה'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-ui font-medium gallery-transition relative",
                  isActive(item.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground",
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
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'EN' : 'עב'}
                </span>
              </Button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-popover border rounded-md shadow-lg py-1 min-w-[80px]">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-accent/50 transition-colors ${
                      language === 'en' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onLanguageChange('he')}
                    className={`w-full px-3 py-2 text-sm text-left hover:bg-accent/50 transition-colors ${
                      language === 'he' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    עב
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 hover:bg-accent/50"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">
                  {language === 'en' ? 'EN' : 'עב'}
                </span>
              </Button>
              
              {/* Mobile Dropdown */}
              <div className="absolute top-full right-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-popover border rounded-md shadow-lg py-1 min-w-[60px]">
                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`w-full px-2 py-1 text-xs text-left hover:bg-accent/50 transition-colors ${
                      language === 'en' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onLanguageChange('he')}
                    className={`w-full px-2 py-1 text-xs text-left hover:bg-accent/50 transition-colors ${
                      language === 'he' ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    עב
                  </button>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "block text-base font-ui font-medium gallery-transition py-2",
                  isActive(item.href) 
                    ? "text-primary" 
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