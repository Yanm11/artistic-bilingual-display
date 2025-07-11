import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Palette, Users, Award } from 'lucide-react';
import { Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface HomePageProps {
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const isRTL = language === 'he';

  const features = [
    {
      icon: Palette,
      title: {
        en: 'Contemporary Art',
        he: 'אמנות עכשווית'
      },
      description: {
        en: 'Discover unique pieces from emerging and established contemporary artists',
        he: 'גלו יצירות ייחודיות של אמנים עכשוויים מתחילים ומוכרים'
      }
    },
    {
      icon: Users,
      title: {
        en: 'Featured Artists',
        he: 'אמנים מובילים'
      },
      description: {
        en: 'Meet the talented artists behind these extraordinary works of art',
        he: 'הכירו את האמנים המוכשרים מאחורי יצירות האמנות יוצאות הדופן הללו'
      }
    },
    {
      icon: Award,
      title: {
        en: 'Curated Collection',
        he: 'אוסף אוצר'
      },
      description: {
        en: 'Every piece is carefully selected for its artistic merit and emotional impact',
        he: 'כל יצירה נבחרת בקפידה על פי ערכה האמנותי והרגשי'
      }
    }
  ];

  const content = {
    en: {
      hero: {
        title: 'Where Art Meets Emotion',
        subtitle: 'Discover extraordinary contemporary artworks that speak to the soul',
        cta: 'Explore Gallery'
      },
      about: {
        title: 'Gallery Lumina',
        description: 'A space where contemporary art comes alive. We showcase works that challenge, inspire, and transform the way we see the world.'
      },
      features: {
        title: 'Experience Art Like Never Before'
      }
    },
    he: {
      hero: {
        title: 'כאשר אמנות פוגשת רגש',
        subtitle: 'גלו יצירות אמנות עכשוויות יוצאות דופן הדוברות אל הנשמה',
        cta: 'חקרו את הגלריה'
      },
      about: {
        title: 'גלריה לומינה',
        description: 'מרחב בו האמנות העכשווית מתעוררת לחיים. אנו מציגים יצירות המאתגרות, מעוררות השראה ומשנות את הדרך בה אנו רואים את העולם.'
      },
      features: {
        title: 'חוו אמנות כפי שלא חוויתם מעולם'
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-gallery font-light text-foreground mb-6 animate-fade-in-up",
            isRTL && "text-right"
          )}>
            {currentContent.hero.title}
          </h1>
          
          <p className={cn(
            "text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-ui animate-fade-in-up",
            isRTL && "text-right"
          )} style={{ animationDelay: '0.2s' }}>
            {currentContent.hero.subtitle}
          </p>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              asChild 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-ui gallery-transition"
            >
              <Link to="/gallery" className="flex items-center gap-2">
                {currentContent.hero.cta}
                {isRTL ? 
                  <ArrowRight className="h-5 w-5 rotate-180" /> : 
                  <ArrowRight className="h-5 w-5" />
                }
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16",
            isRTL && "text-right"
          )}>
            <h2 className="text-3xl md:text-4xl font-gallery font-semibold text-foreground mb-6">
              {currentContent.about.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-ui">
              {currentContent.about.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className={cn(
            "text-3xl md:text-4xl font-gallery font-semibold text-foreground mb-16 text-center",
            isRTL && "text-right"
          )}>
            {currentContent.features.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "text-center p-8 bg-card rounded-sm gallery-shadow gallery-transition hover:gallery-shadow-hover",
                  isRTL && "text-right"
                )}
              >
                <div className="flex justify-center mb-6">
                  <feature.icon className="h-12 w-12 text-primary" />
                </div>
                
                <h3 className="text-xl font-gallery font-semibold text-foreground mb-4">
                  {feature.title[language]}
                </h3>
                
                <p className="text-muted-foreground font-ui leading-relaxed">
                  {feature.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl font-gallery font-semibold text-foreground mb-8",
            isRTL && "text-right"
          )}>
            {language === 'en' ? 'Ready to Explore?' : 'מוכנים לחקור?'}
          </h2>
          
          <Button asChild size="lg" className="px-8 py-6 text-lg font-ui">
            <Link to="/gallery" className="flex items-center gap-2">
              {language === 'en' ? 'Visit Gallery' : 'בקרו בגלריה'}
              {isRTL ? 
                <ArrowRight className="h-5 w-5 rotate-180" /> : 
                <ArrowRight className="h-5 w-5" />
              }
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;