import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Language } from '@/types/gallery';
import { cn } from '@/lib/utils';

interface AboutPageProps {
  language: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const isRTL = language === 'he';

  const content = {
    en: {
      title: 'About Gallery Lumina',
      mission: {
        title: 'Our Mission',
        description: 'Gallery Lumina is dedicated to showcasing exceptional contemporary art that challenges perspectives and enriches lives. We believe art has the power to transform, inspire, and connect people across cultures and communities.'
      },
      philosophy: {
        title: 'Our Philosophy',
        description: 'We curate works that speak to the human experience, selecting pieces that demonstrate technical excellence while conveying profound emotional depth. Every artwork in our collection has been chosen for its ability to engage viewers in meaningful dialogue with the artist\'s vision.'
      },
      history: {
        title: 'Our Story',
        description: 'Founded with a passion for contemporary art, Gallery Lumina has evolved into a respected platform for both emerging and established artists. We pride ourselves on creating an intimate space where art can be experienced in its full emotional and intellectual complexity.'
      },
      visit: {
        title: 'Visit Us',
        address: '123 Art District, Cultural Quarter, New York, NY 10001',
        email: 'info@gallerylumina.com',
        phone: '+1 (555) 123-4567',
        hours: 'Tuesday - Sunday: 10:00 AM - 7:00 PM'
      }
    },
    he: {
      title: 'אודות גלריה לומינה',
      mission: {
        title: 'המשימה שלנו',
        description: 'גלריה לומינה מוקדשת להצגת אמנות עכשווית יוצאת דופן המאתגרת נקודות מבט ומעשירה חיים. אנו מאמינים שלאמנות יש כוח לשנות, להעניק השראה ולחבר אנשים בין תרבויות וקהילות.'
      },
      philosophy: {
        title: 'הפילוסופיה שלנו',
        description: 'אנו אוצרים יצירות הדוברות אל החוויה האנושית, בוחרים יצירות המפגינות מצוינות טכנית תוך העברת עומק רגשי עמוק. כל יצירת אמנות באוסף שלנו נבחרה על יכולתה לערב צופים בדיאלוג משמעותי עם חזון האמן.'
      },
      history: {
        title: 'הסיפור שלנו',
        description: 'נוסדה מתוך תשוקה לאמנות עכשווית, גלריה לומינא התפתחה לפלטפורמה מכובדת הן לאמנים מתחילים והן למבוססים. אנו מתגאים ביצירת מרחב אינטימי בו ניתן לחוות אמנות במלוא המורכבות הרגשית והאינטלקטואלית שלה.'
      },
      visit: {
        title: 'בקרו אותנו',
        address: 'רחוב האמנות 123, הרובע התרבותי, ניו יורק, NY 10001',
        email: 'info@gallerylumina.com',
        phone: '+1 (555) 123-4567',
        hours: 'שלישי - ראשון: 10:00 - 19:00'
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className={cn("min-h-screen pt-24 pb-16", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("text-center mb-16", isRTL && "text-right")}>
          <h1 className="text-4xl md:text-5xl font-gallery font-semibold text-foreground mb-6 animate-fade-in-up">
            {currentContent.title}
          </h1>
        </div>

        {/* Mission */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className={cn(
            "text-2xl md:text-3xl font-gallery font-semibold text-foreground mb-6",
            isRTL && "text-right"
          )}>
            {currentContent.mission.title}
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground leading-relaxed font-ui",
            isRTL && "text-right"
          )}>
            {currentContent.mission.description}
          </p>
        </section>

        {/* Philosophy */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className={cn(
            "text-2xl md:text-3xl font-gallery font-semibold text-foreground mb-6",
            isRTL && "text-right"
          )}>
            {currentContent.philosophy.title}
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground leading-relaxed font-ui",
            isRTL && "text-right"
          )}>
            {currentContent.philosophy.description}
          </p>
        </section>

        {/* History */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className={cn(
            "text-2xl md:text-3xl font-gallery font-semibold text-foreground mb-6",
            isRTL && "text-right"
          )}>
            {currentContent.history.title}
          </h2>
          <p className={cn(
            "text-lg text-muted-foreground leading-relaxed font-ui",
            isRTL && "text-right"
          )}>
            {currentContent.history.description}
          </p>
        </section>

        {/* Visit Information */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h2 className={cn(
            "text-2xl md:text-3xl font-gallery font-semibold text-foreground mb-8",
            isRTL && "text-right"
          )}>
            {currentContent.visit.title}
          </h2>
          
          <div className="bg-card p-8 rounded-sm gallery-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-ui font-semibold text-foreground mb-2">
                    {language === 'en' ? 'Address' : 'כתובת'}
                  </h3>
                  <p className="text-muted-foreground font-ui">
                    {currentContent.visit.address}
                  </p>
                </div>
              </div>

              <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-ui font-semibold text-foreground mb-2">
                    {language === 'en' ? 'Hours' : 'שעות פתיחה'}
                  </h3>
                  <p className="text-muted-foreground font-ui">
                    {currentContent.visit.hours}
                  </p>
                </div>
              </div>

              <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-ui font-semibold text-foreground mb-2">
                    {language === 'en' ? 'Email' : 'אימייל'}
                  </h3>
                  <p className="text-muted-foreground font-ui">
                    {currentContent.visit.email}
                  </p>
                </div>
              </div>

              <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse text-right")}>
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-ui font-semibold text-foreground mb-2">
                    {language === 'en' ? 'Phone' : 'טלפון'}
                  </h3>
                  <p className="text-muted-foreground font-ui">
                    {currentContent.visit.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;