import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GalleryPage from "./pages/GalleryPage";
import ArtistPage from "./pages/ArtistPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { Language } from "./types/gallery";

const queryClient = new QueryClient();

const App = () => {
  // Load language from localStorage or default to Hebrew
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('gallery-language');
    return (savedLanguage as Language) || 'he';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gallery-language', language);
  }, [language]);

  // Handle language change with page refresh
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Refresh the page after a short delay to ensure localStorage is updated
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navigation language={language} onLanguageChange={handleLanguageChange} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<AboutPage language={language} />} />
                  <Route path="/gallery" element={<GalleryPage language={language} />} />
                  <Route path="/artist/:artistId" element={<ArtistPage language={language} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer language={language} />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
