import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock, GraduationCap, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '@/types/gallery';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { generateGalleryImages, GalleryImage } from '@/data/galleryImages';
import { useIsMobile } from '@/hooks/use-mobile';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface AboutPageProps {
  language: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const isRTL = language === 'he';
  const isMobile = useIsMobile();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  // Generate gallery images array
  useEffect(() => {
    const images = generateGalleryImages(language);
    setGalleryImages(images);
  }, [language]);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === galleryImages.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goToPrevious();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goToNext();
            break;
          case 'Escape':
            event.preventDefault();
            closeImageModal();
            break;
        }
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedImageIndex]);

  const content = {
    en: {
      title: 'Exhibition by Graduates of the Creative Arts Division',
      subtitle: 'Exclusive Engagement Course 2025',
      mainText: 'Creating art during wartime is not to be taken for granted. It is a courageous act expressing belief in the value of life and in the value of the thoughts and feelings that resonate within us.\n\nMany students gravitated toward intimate formats and the use of "traditional" media such as drawing, painting, and photography. This was not a conscious decision, but a natural and appropriate response to the situation. As if, in face of the roar of planes and cannons, in face of the forces of destruction and death, art does not fall silent, nor does it turn inwards into sterile formalism but turns to the realms of the soul, and with courage and persistence proffers its modest fruit.',
      photographer: 'Photographer: Gal Manor',
      participants: {
        title: 'Course Participants',
        instructors: 'Course Instructors: Dr. Noam Gonnen and Ariel Asseo',
        artists: 'Course Graduates:',
        artistsList: [
          'Yarden Arzi',
          'Neta Bloch',
          'Lior Braunstain',
          'Ella Burd',
          'Mays Eben Hamad',
          'Ofry Elkabetz',
          'Eden Goldstein',
          'Shaked Haftka',
          'Shelly Hanutin',
          'Noa Jasmin Harari',
          'Emily Khandey',
          'Eyar Naor',
          'Gal Manor',
          'Ella Rose Perry',
          'Nuriel Shechtman',
          'Ariela Shimshon',
          'Gal Tal'
        ]
      },
      visit: {
        title: 'Visit the Exhibition',
        address: 'George Sharot Visitor Center, Samuel and Mildred Ayrton University Center (Building 71, Floor 1), Marcus Family University Campus, 1 Ben-Gurion Boulevard, Be’er Sheva.',
        email: 'trumpeldor.gallery@gmail.com',
        phone: '08-6477199',
        hours: 'Sunday - Thursday: 10:00 AM - 6:00 PM\nFriday: 10:00 AM - 2:00 PM\nSaturday: Closed\nThe entrance is free. Please note! The gallery is closed to visitors temporarily.'
      }
    },
    he: {
      title: 'עניין אישי - רגע לאמנות',
      subtitle: 'תערוכת בוגרות חטיבת יצירה, המחלקה לאמנויות 2025',
      mainText: 'מעשה האמנות בעת מלחמה אינו מובן מאליו. זהו מעשה אמיץ של אמונה בערך החיים, בערכם של המחשבות והרגשות המפעמים.\n\nבאופן טבעי ולא מכוון אבל בהלימה למציאות, נטו סטודנטיות רבות לפורמט האינטימי ולשימוש במדימויים "מסורתיים" כגון רישום, ציור וצילום. כאילו כנגד רעם המטוסים והתותחים, כנגד כוחות ההרס והמוות, אין האמנות משתתקת, ואין מסתגרת בגבולותיה בפורמליזם עקר, אלא נסוגה, כביכול, למחוזות הנפש ומציעה באומץ ובעקשנות את פרייה הצנוע.',
      photographer: 'צילום: גל מנור',
      participants: {
        title: 'משתתפי הקורס',
        instructors: 'מנחי הקורס: ד"ר נועם גונן ואריאל אסאו',
        artists: 'בוגרות הקורס:',
        artistsList: [
          'מייס אבן חמאד',
          'עופרי אלקבץ',
          'ירדן ארזי',
          'אליונורה בורד',
          'נטע בלוך',
          'ליאור בראונשטיין',
          'עדן גולדשטיין',
          'שקד הפטקה',
          'נעה ג\'סמין הררי',
          'אמילי חנדי',
          'שלי חנוטין',
          'גל טל',
          'גל מנור',
          'אייר נאור',
          'אלה רוז פרי',
          'נוריאל שכטמן',
          'אריאלה שמשון'
        ]
      },
      visit: {
        title: 'בקרו בתערוכה',
        address: 'מרכז המבקרים ע"ש ג\'ורג\' שרוט המרכז האוניברסיטאי ע"ש סמואל ומילדה איירטון (בניין 71, קומה 1-),קריית האוניברסיטה ע"ש משפחת מרקוס, שד\' בן גוריון 1, באר שבע',
        email: 'trumpeldor.gallery@gmail.com',
        phone: '08-6477199',
        hours: 'ראשון - חמישי: 10:00 - 18:00\nשישי: 10:00 - 14:00\nשבת: סגור\nהכניסה חופשית. שימו לב! באופן זמני הגלריה סגורה למבקרים.'
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className={cn("min-h-screen pt-24 pb-16", isRTL && "rtl")} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("text-left mb-12", isRTL && "text-right")}>
          <h1 className="text-4xl md:text-5xl font-gallery font-semibold text-foreground mb-4 animate-fade-in-up">
            {currentContent.title}
          </h1>
          <p className="text-xl text-muted-foreground font-ui animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Exhibition Text */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-card p-8 rounded-lg gallery-shadow">
             {/* Instructors */}
             <div className="mb-6">
              <p className={cn(
                "text-lg font-ui font-semibold text-foreground mb-2",
                isRTL && "text-right"
              )}>
                {currentContent.participants.instructors}
              </p>
            </div>
            <div className={cn(
              "text-lg text-muted-foreground leading-relaxed font-ui whitespace-pre-line",
              isRTL && "text-right"
            )}>
              {currentContent.mainText}
            </div>

            <div className="flex mt-4">
            <p className={cn(
                "text-md font-ui text-foreground",
                isRTL && "text-right"
              )}>
              {language === 'en' ? 'The exhibition is on display from 19.06.25-10.12.25' : 'התערוכה מוצגת בין 19.06.25-10.12.25'}
              </p>
            </div>

            {/*photographer*/}
            <div className="mt-4">
              <p className={cn(
                "text-md font-ui text-foreground",
                isRTL && "text-right"
              )}>
                {currentContent.photographer}
              </p>
            </div>
            
          </div>
        </div>

        {/* Course Participants */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-card p-8 rounded-lg gallery-shadow">
            {/* Artists */}
            <div>
              <h3 className={cn(
                "text-lg font-ui font-semibold text-foreground mb-4",
                isRTL && "text-right"
              )}>
                {currentContent.participants.artists}
              </h3>
              <div className={cn(
                "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
                isRTL && "text-right"
              )}>
                {currentContent.participants.artistsList.map((artist, index) => (
                  <div 
                    key={index}
                    className="text-muted-foreground font-ui hover:text-foreground transition-colors"
                  >
                    {artist}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="mb-16 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="gallery-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div 
                  className={cn(
                    "relative overflow-hidden rounded-lg gallery-shadow cursor-pointer",
                    isMobile ? "h-80" : "w-full max-w-full lg:max-w-[1000px] xl:max-w-[1800px] mx-auto lg:h-[600px]"
                  )}
                  onClick={() => openImageModal(index)}
                >
                  <img 
                    src={image.src} 
                    alt={`Gallery Image ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <button className={cn(
            "swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg",
            isRTL ? "right-4" : "left-4",
            isMobile ? "hidden" : "block"
          )}>
            {isRTL ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>
          <button className={cn(
            "swiper-button-next-custom absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg",
            isRTL ? "left-4" : "right-4",
            isMobile ? "hidden" : "block"
          )}>
            {isRTL ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </button>
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <Dialog open={true} onOpenChange={closeImageModal}>
            <DialogContent className="max-w-6xl w-full h-[90vh] p-0 gap-0">
              <VisuallyHidden.Root>
                <DialogTitle>
                  {language === 'en' ? `Gallery Image ${selectedImageIndex + 1}` : `תמונה ${selectedImageIndex + 1}`}
                </DialogTitle>
                <DialogDescription>
                  {language === 'en' ? `Student artwork from the exhibition` : `יצירת סטודנט מהתערוכה`}
                </DialogDescription>
              </VisuallyHidden.Root>
              
              <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Previous button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPrevious}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white",
                    isRTL ? "right-4" : "left-4"
                  )}
                >
                  {isRTL ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                </Button>

                {/* Next button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNext}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white",
                    isRTL ? "left-4" : "right-4"
                  )}
                >
                  {isRTL ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                </Button>

                {/* Image */}
                <img
                  src={galleryImages[selectedImageIndex].src}
                  alt={`Gallery Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Visit Information */}
<section className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
  <h2 className={cn(
    "text-2xl md:text-3xl font-gallery font-semibold text-foreground mb-8",
    isRTL && "text-right"
  )}>
    {currentContent.visit.title}
  </h2>
  
  <div className="bg-card p-8 rounded-lg gallery-shadow">
    {/* Top row - Address and Hours */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className={cn(
        "flex items-start gap-4",
        isRTL && "md:col-start-1"
      )}>
        <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className={cn(
            "font-ui font-semibold text-foreground mb-2",
            isRTL && "text-right"
          )}>
            {language === 'en' ? 'Address' : 'כתובת'}
          </h3>
          <p className={cn(
            "text-muted-foreground font-ui",
            isRTL && "text-right"
          )}>
            {currentContent.visit.address}
          </p>
        </div>
      </div>

      <div className={cn(
        "flex items-start gap-4",
        isRTL && "md:col-start-2"
      )}>
        <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className={cn(
            "font-ui font-semibold text-foreground mb-2",
            isRTL && "text-right"
          )}>
            {language === 'en' ? 'Hours' : 'שעות פתיחה'}
          </h3>
          <p className={cn(
            "text-muted-foreground font-ui whitespace-pre-line",
            isRTL && "text-right"
          )}>
            {currentContent.visit.hours}
          </p>
        </div>
      </div>
    </div>
    
    {/* Group visits text - centered */}
    <div className="flex mt-8 mb-8">
      <h3 className={cn(
        "text-foreground font-ui font-semibold",
        isRTL && "text-right"
      )}>
        {language === 'en' ? 'For group visits, please contact: art department' : 'להדרכה לקבוצות צרו קשר: המחלקה לאמנויות'}
      </h3>
    </div>

    {/* Bottom row - Phone and Email */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={cn(
        "flex items-start gap-4",
        isRTL && "md:col-start-1"
      )}>
        <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className={cn(
            "font-ui font-semibold text-foreground mb-2",
            isRTL && "text-right"
          )}>
            {language === 'en' ? 'Phone' : 'טלפון'}
          </h3>
          <p className={cn(
            "text-muted-foreground font-ui",
            isRTL && "text-right"
          )} dir="ltr">
            {currentContent.visit.phone}
          </p>
        </div>
      </div>

      <div className={cn(
        "flex items-start gap-4",
        isRTL && "md:col-start-2"
      )}>
        <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className={cn(
            "font-ui font-semibold text-foreground mb-2",
            isRTL && "text-right"
          )}>
            {language === 'en' ? 'Email' : 'אימייל'}
          </h3>
          <p className={cn(
            "text-muted-foreground font-ui",
            isRTL && "text-right"
          )} dir="ltr">
            {currentContent.visit.email}
          </p>
        </div>
      </div>
    </div>

    {/* Group visits text - centered */}
    {/* <div className="flex justify-center items-center mt-8">
      <p className={cn(
        "text-muted-foreground font-ui text-center",
        isRTL && "text-right"
      )}>
        {language === 'en' ? 'For group visits, please contact: art department' : 'להדרכה לקבוצות צרו קשר: המחלקה לאמנויות'}
      </p>
    </div> */}

    {/* Social Media Links */}
    <div className="flex justify-center items-center mt-8 gap-6">
      <a 
        href="https://www.facebook.com/Art.BGU" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={language === 'en' ? 'Visit our Facebook page' : 'בקרו בדף הפייסבוק שלנו'}
      >
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
      
      <a 
        href="https://www.instagram.com/p/DME4riRtY8u/?img_index=4&igsh=Z2ViNGgzMGl3ZDR1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={language === 'en' ? 'Instagram page' : 'דף אינסטגרם'}
        title={language === 'en' ? 'Instagram link' : 'קישור אינסטגרם'}
      >
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
    </div>
  </div>
</section>
      </div>
    </div>
  );
};

export default AboutPage;